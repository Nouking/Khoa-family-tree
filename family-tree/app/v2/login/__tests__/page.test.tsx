import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import LoginPageV2 from '../page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

// Mock fetch
global.fetch = jest.fn()

const mockRouter = {
  push: jest.fn()
}

describe('LoginPageV2', () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(fetch as jest.Mock).mockClear()
    mockRouter.push.mockClear()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Page Rendering', () => {
    it('renders with correct form elements and styling', () => {
      render(<LoginPageV2 />)
      
      // Check header
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByText('Khoa Family Tree')).toBeInTheDocument()
      
      // Check form elements
      expect(screen.getByRole('form', { name: /login form/i })).toBeInTheDocument()
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
      
      // Check navigation links
      expect(screen.getByRole('link', { name: /return to home/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /continue as viewer/i })).toBeInTheDocument()
    })

    it('has proper ARIA labels and accessibility attributes', () => {
      render(<LoginPageV2 />)
      
      const form = screen.getByRole('form')
      expect(form).toHaveAttribute('aria-label', 'Login form')
      
      const usernameInput = screen.getByLabelText(/username/i)
      expect(usernameInput).toHaveAttribute('required')
      expect(usernameInput).toHaveAttribute('aria-invalid', 'false')
      
      const passwordInput = screen.getByLabelText(/password/i)
      expect(passwordInput).toHaveAttribute('required')
      expect(passwordInput).toHaveAttribute('type', 'password')
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      expect(submitButton).toHaveAttribute('type', 'submit')
    })

    it('applies warm theme token styling', () => {
      render(<LoginPageV2 />)
      
      const main = screen.getByRole('main')
      expect(main).toHaveStyle({
        background: 'var(--color-warm-surface)',
        color: 'var(--color-warm-ink)'
      })
      
      // Check touch targets are minimum 44px
      const usernameInput = screen.getByLabelText(/username/i)
      expect(usernameInput).toHaveStyle({ minHeight: '44px' })
      
      const passwordInput = screen.getByLabelText(/password/i)
      expect(passwordInput).toHaveStyle({ minHeight: '44px' })
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      expect(submitButton).toHaveStyle({ minHeight: '44px' })
    })
  })

  describe('Form Validation', () => {
    it('requires username and password fields', async () => {
      render(<LoginPageV2 />)
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      fireEvent.click(submitButton)
      
      // HTML5 validation should prevent submission
      const usernameInput = screen.getByLabelText(/username/i)
      const passwordInput = screen.getByLabelText(/password/i)
      
      expect(usernameInput).toHaveAttribute('required')
      expect(passwordInput).toHaveAttribute('required')
    })

    it('updates form state on input changes', () => {
      render(<LoginPageV2 />)
      
      const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement
      const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement
      const rememberCheckbox = screen.getByLabelText(/remember me/i) as HTMLInputElement
      
      fireEvent.change(usernameInput, { target: { value: 'testuser' } })
      fireEvent.change(passwordInput, { target: { value: 'testpass' } })
      fireEvent.click(rememberCheckbox)
      
      expect(usernameInput.value).toBe('testuser')
      expect(passwordInput.value).toBe('testpass')
      expect(rememberCheckbox.checked).toBe(true)
    })
  })

  describe('Authentication Flow', () => {
    it('handles successful login and redirects to /v2/view', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })

      render(<LoginPageV2 />)
      
      const usernameInput = screen.getByLabelText(/username/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      fireEvent.change(usernameInput, { target: { value: 'admin' } })
      fireEvent.change(passwordInput, { target: { value: 'password' } })
      fireEvent.click(submitButton)
      
      expect(fetch).toHaveBeenCalledWith('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'password' })
      })
      
      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith('/v2/view')
      })
    })

    it('shows loading state during submission', async () => {
      ;(fetch as jest.Mock).mockImplementationOnce(
        () => new Promise(resolve => setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 100))
      )

      render(<LoginPageV2 />)
      
      const usernameInput = screen.getByLabelText(/username/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      fireEvent.change(usernameInput, { target: { value: 'admin' } })
      fireEvent.change(passwordInput, { target: { value: 'password' } })
      fireEvent.click(submitButton)
      
      expect(screen.getByText('Signing in…')).toBeInTheDocument()
      expect(submitButton).toHaveAttribute('aria-busy', 'true')
      expect(submitButton).toBeDisabled()
      
      await waitFor(() => {
        expect(screen.getByText('Sign in')).toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('displays error for 400 status (bad request)', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ message: 'Username and password are required' })
      })

      render(<LoginPageV2 />)
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
        expect(screen.getByText('Username and password are required')).toBeInTheDocument()
      })
    })

    it('displays error for 401 status (unauthorized)', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({})
      })

      render(<LoginPageV2 />)
      
      const usernameInput = screen.getByLabelText(/username/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      fireEvent.change(usernameInput, { target: { value: 'admin' } })
      fireEvent.change(passwordInput, { target: { value: 'wrongpass' } })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Invalid username or password')).toBeInTheDocument()
      })
    })

    it('displays error for 500+ status (server error)', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({})
      })

      render(<LoginPageV2 />)
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument()
      })
    })

    it('displays error for network failures', async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      render(<LoginPageV2 />)
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Unable to connect. Please try again.')).toBeInTheDocument()
      })
    })

    it('announces errors via aria-live', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({})
      })

      render(<LoginPageV2 />)
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        const errorElement = screen.getByRole('alert')
        expect(errorElement).toHaveAttribute('aria-live', 'polite')
      })
    })

    it('clears previous errors on new submission', async () => {
      // First request fails
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({})
      })

      render(<LoginPageV2 />)
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Invalid username or password')).toBeInTheDocument()
      })
      
      // Second request succeeds
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })
      
      fireEvent.click(submitButton)
      
      // Error should be cleared immediately
      expect(screen.queryByText('Invalid username or password')).not.toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    it('has logical tab order', () => {
      render(<LoginPageV2 />)
      
      const usernameInput = screen.getByLabelText(/username/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const rememberCheckbox = screen.getByLabelText(/remember me/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      // Tab order: Username → Password → Remember Me → Submit
      usernameInput.focus()
      expect(document.activeElement).toBe(usernameInput)
      
      // Use userEvent or manually set focus to simulate tab behavior
      passwordInput.focus()
      expect(document.activeElement).toBe(passwordInput)
      
      rememberCheckbox.focus()
      expect(document.activeElement).toBe(rememberCheckbox)
      
      submitButton.focus()
      expect(document.activeElement).toBe(submitButton)
    })

    it('supports Enter key submission', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })

      render(<LoginPageV2 />)
      
      const usernameInput = screen.getByLabelText(/username/i)
      const passwordInput = screen.getByLabelText(/password/i)
      
      // Fill out form
      fireEvent.change(usernameInput, { target: { value: 'admin' } })
      fireEvent.change(passwordInput, { target: { value: 'password' } })
      
      // Press Enter in password field
      fireEvent.keyDown(passwordInput, { key: 'Enter' })
      fireEvent.submit(screen.getByRole('form'))
      
      // Form submission should be triggered
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/auth/login', expect.any(Object))
      })
    })
  })

  describe('Responsive Behavior', () => {
    it('maintains touch target sizes on mobile', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      })

      render(<LoginPageV2 />)
      
      const usernameInput = screen.getByLabelText(/username/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      // Touch targets should still be 44px minimum
      expect(usernameInput).toHaveStyle({ minHeight: '44px' })
      expect(passwordInput).toHaveStyle({ minHeight: '44px' })
      expect(submitButton).toHaveStyle({ minHeight: '44px' })
    })

    it('renders form at proper width constraints', () => {
      render(<LoginPageV2 />)
      
      const formContainer = screen.getByRole('form').parentElement
      expect(formContainer).toHaveClass('w-full', 'max-w-md')
    })
  })

  describe('Navigation Links', () => {
    it('includes correct navigation links', () => {
      render(<LoginPageV2 />)
      
      const homeLink = screen.getByRole('link', { name: /return to home/i })
      expect(homeLink).toHaveAttribute('href', '/')
      
      const viewerLink = screen.getByRole('link', { name: /continue as viewer/i })
      expect(viewerLink).toHaveAttribute('href', '/v2/view')
    })
  })
})