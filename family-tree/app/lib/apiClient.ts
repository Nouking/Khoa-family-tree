interface ApiClientOptions {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  ok: boolean;
}

class ApiError extends Error {
  status: number;
  response?: Response;

  constructor(message: string, status: number, response?: Response) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}

const DEFAULT_OPTIONS: Required<ApiClientOptions> = {
  timeout: 10000, // 10 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
};

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithTimeout(
  url: string, 
  options: RequestInit, 
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Request timeout', 408);
    }
    throw error;
  }
}

async function makeRequest<T = unknown>(
  url: string,
  options: RequestInit = {},
  clientOptions: ApiClientOptions = {}
): Promise<ApiResponse<T>> {
  const config = { ...DEFAULT_OPTIONS, ...clientOptions };
  let lastError: Error;

  for (let attempt = 1; attempt <= config.retries; attempt++) {
    try {
      console.log(`API Request [Attempt ${attempt}/${config.retries}]:`, {
        method: options.method || 'GET',
        url,
        headers: options.headers,
      });

      const response = await fetchWithTimeout(url, options, config.timeout);

      // Log response details
      console.log(`API Response [${response.status}]:`, {
        url,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (!response.ok) {
        let errorData: { message?: string; error?: string };
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
        }

        const errorMessage = errorData.message || errorData.error || 'Request failed';
        throw new ApiError(errorMessage, response.status, response);
      }

      let data: T;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = (await response.text()) as unknown as T;
      }

      return {
        data,
        status: response.status,
        ok: response.ok,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      console.error(`API Request failed [Attempt ${attempt}/${config.retries}]:`, {
        url,
        error: lastError.message,
        stack: lastError.stack,
      });

      // Don't retry on 4xx errors (client errors)
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        throw error;
      }

      // If this is the last attempt, throw the error
      if (attempt === config.retries) {
        throw lastError;
      }

      // Wait before retrying
      await sleep(config.retryDelay * attempt);
    }
  }

  throw lastError!;
}

export const apiClient = {
  async get<T = unknown>(url: string, options?: ApiClientOptions): Promise<ApiResponse<T>> {
    return makeRequest<T>(url, { method: 'GET' }, options);
  },

  async post<T = unknown>(
    url: string, 
    body?: unknown, 
    options?: ApiClientOptions
  ): Promise<ApiResponse<T>> {
    return makeRequest<T>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    }, options);
  },

  async put<T = unknown>(
    url: string, 
    body?: unknown, 
    options?: ApiClientOptions
  ): Promise<ApiResponse<T>> {
    return makeRequest<T>(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    }, options);
  },

  async delete<T = unknown>(url: string, options?: ApiClientOptions): Promise<ApiResponse<T>> {
    return makeRequest<T>(url, { method: 'DELETE' }, options);
  },

  // Health check utility
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.get('/api/members', { 
        timeout: 5000, 
        retries: 1 
      });
      return response.ok;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  },
};

export { ApiError };
export type { ApiResponse, ApiClientOptions };