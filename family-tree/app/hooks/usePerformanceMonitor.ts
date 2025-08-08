import { useEffect, useRef, useState, useCallback } from 'react';

interface PerformanceMetrics {
  fps: number;
  renderTime: number;
  memoryUsage?: number;
  lastRenderCount: number;
  averageRenderTime: number;
}

/**
 * Custom hook for monitoring canvas performance
 * Tracks FPS, render times, and memory usage
 */
export function usePerformanceMonitor(isEnabled = true) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    renderTime: 0,
    lastRenderCount: 0,
    averageRenderTime: 0,
  });
  
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const renderTimes = useRef<number[]>([]);
  const rafId = useRef<number | undefined>(undefined);
  
  // FPS and render time tracking
  const measureFrame = useCallback(() => {
    const now = performance.now();
    frameCount.current++;
    
    // Calculate FPS every second
    if (now - lastTime.current >= 1000) {
      const fps = Math.round(frameCount.current * 1000 / (now - lastTime.current));
      frameCount.current = 0;
      lastTime.current = now;
      
      setMetrics(prev => ({
        ...prev,
        fps,
      }));
    }
    
    if (isEnabled) {
      rafId.current = requestAnimationFrame(measureFrame);
    }
  }, [isEnabled]);
  
  // Track individual render operations
  const measureRender = useCallback((renderFn: () => void) => {
    if (!isEnabled) {
      renderFn();
      return;
    }
    
    const startTime = performance.now();
    renderFn();
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    renderTimes.current.push(renderTime);
    
    // Keep only last 100 render times for average calculation
    if (renderTimes.current.length > 100) {
      renderTimes.current = renderTimes.current.slice(-100);
    }
    
    const averageRenderTime = renderTimes.current.reduce((sum, time) => sum + time, 0) / renderTimes.current.length;
    
    setMetrics(prev => ({
      ...prev,
      renderTime,
      lastRenderCount: prev.lastRenderCount + 1,
      averageRenderTime,
    }));
  }, [isEnabled]);
  
  // Memory usage tracking (if available)
  const updateMemoryUsage = useCallback(() => {
    if (isEnabled && 'memory' in performance) {
      const memory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory;
      if (memory) {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
        }));
      }
    }
  }, [isEnabled]);
  
  useEffect(() => {
    if (isEnabled) {
      rafId.current = requestAnimationFrame(measureFrame);
      
      // Update memory usage every 5 seconds
      const memoryInterval = setInterval(updateMemoryUsage, 5000);
      
      return () => {
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
        clearInterval(memoryInterval);
      };
    }
  }, [isEnabled, measureFrame, updateMemoryUsage]);
  
  // Helper function to check if performance is acceptable
  const getPerformanceStatus = useCallback((): 'good' | 'warning' | 'poor' => {
    if (metrics.fps >= 30 && metrics.averageRenderTime < 16) {
      return 'good';
    } else if (metrics.fps >= 20 && metrics.averageRenderTime < 33) {
      return 'warning';
    }
    return 'poor';
  }, [metrics.fps, metrics.averageRenderTime]);
  
  // Performance improvement suggestions
  const getSuggestions = useCallback((): string[] => {
    const suggestions: string[] = [];
    
    if (metrics.fps < 20) {
      suggestions.push('Consider reducing the number of visible members');
      suggestions.push('Enable virtualization for large family trees');
    }
    
    if (metrics.averageRenderTime > 33) {
      suggestions.push('Optimize component re-renders with memoization');
      suggestions.push('Consider simplifying visual effects during interactions');
    }
    
    if (metrics.memoryUsage && metrics.memoryUsage > 100) {
      suggestions.push('Memory usage is high - check for memory leaks');
      suggestions.push('Consider clearing unused cached data');
    }
    
    return suggestions;
  }, [metrics]);
  
  return {
    metrics,
    measureRender,
    getPerformanceStatus,
    getSuggestions,
  };
}

/**
 * Hook for throttling expensive operations based on performance
 */
export function usePerformanceThrottling(targetFps = 30) {
  const lastCallTime = useRef(0);
  const fpsHistory = useRef<number[]>([]);
  
  const shouldThrottle = useCallback((currentFps?: number): boolean => {
    if (currentFps !== undefined) {
      fpsHistory.current.push(currentFps);
      
      // Keep only last 10 FPS readings
      if (fpsHistory.current.length > 10) {
        fpsHistory.current = fpsHistory.current.slice(-10);
      }
      
      // Calculate average FPS
      const averageFps = fpsHistory.current.reduce((sum, fps) => sum + fps, 0) / fpsHistory.current.length;
      
      return averageFps < targetFps;
    }
    
    return false;
  }, [targetFps]);
  
  const throttledExecute = useCallback((fn: () => void, minInterval = 16): void => {
    const now = performance.now();
    
    if (now - lastCallTime.current >= minInterval) {
      fn();
      lastCallTime.current = now;
    }
  }, []);
  
  return {
    shouldThrottle,
    throttledExecute,
  };
}