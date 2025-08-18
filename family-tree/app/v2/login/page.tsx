'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import '../v2-styles.css'

export default function LoginPageV2() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok) {
        // Token is set via HttpOnly cookie by the server
        router.push('/v2/view')
        return
      }

      // Handle different error scenarios
      if (response.status === 400) {
        setError(data?.message || 'Username and password are required')
      } else if (response.status === 401) {
        setError('Invalid username or password')
      } else if (response.status >= 500) {
        setError('An unexpected error occurred. Please try again.')
      } else {
        setError(data?.message || 'Login failed')
      }
    } catch (err) {
      console.error('Login network error:', err)
      setError('Unable to connect. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div 
      className="min-h-dvh flex flex-col"
      style={{ 
        background: 'var(--v2-color-surface)',
        color: 'var(--v2-color-ink)',
        fontFamily: 'var(--v2-font-family-sans)'
      }}
    >
      {/* Header with warm gradient */}
      <header className="v2-header-gradient text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span 
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: 'hsl(0 0% 100% / 0.2)' }}
            >
              👪
            </span>
            <h1 className="text-base sm:text-lg font-semibold leading-tight">
              Khoa Family Tree
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-3 sm:px-6 py-8">
        <div className="w-full panel p-6 sm:p-8" style={{ maxWidth: 'var(--v2-container-login-max-width)' }}>
          <div className="mb-5 sm:mb-6 text-center">
            <h2 
              className="text-2xl sm:text-3xl font-semibold"
              style={{ color: 'var(--v2-color-ink)' }}
            >
              Sign in
            </h2>
            <p 
              className="mt-1 text-sm"
              style={{ opacity: '0.7' }}
            >
              Access editing features for your family tree
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div 
              className="mb-4 panel border-rose-200 bg-rose-50 text-rose-700 text-sm"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          <form 
            className="space-y-4" 
            onSubmit={handleSubmit}
            aria-label="Login form"
            noValidate
          >
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium"
                style={{ color: 'var(--v2-color-ink)' }}
              >
                Username
              </label>
              <input 
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                aria-invalid={error && error.includes('username') ? 'true' : 'false'}
                aria-describedby={error && error.includes('username') ? 'username-error' : undefined}
                className="input mt-1 w-full"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium"
                style={{ color: 'var(--v2-color-ink)' }}
              >
                Password
              </label>
              <input 
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                aria-invalid={error && error.includes('password') ? 'true' : 'false'}
                aria-describedby={error && error.includes('password') ? 'password-error' : undefined}
                className="input mt-1 w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <label 
                className="inline-flex items-center gap-2 text-sm"
                style={{ opacity: '0.8' }}
              >
                <input 
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded"
                  style={{ minWidth: '16px', minHeight: '16px' }}
                />
                Remember me
              </label>
            </div>

            <div className="flex justify-center">
              <button 
                id="submitBtn"
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className="btn btn-press btn-primary block w-full text-center"
              >
                {isLoading ? 'Signing in…' : 'Sign in'}
              </button>
            </div>

            <div 
              className="text-center pt-2 text-sm"
              style={{ color: 'var(--v2-color-ink)' }}
            >
              <Link 
                href="/" 
                className="underline decoration-dotted hover:no-underline"
                style={{ color: 'inherit' }}
              >
                Return to home
              </Link>
              <span className="mx-2" style={{ opacity: '0.6' }}>•</span>
              <Link 
                href="/v2/view" 
                className="underline decoration-dotted hover:no-underline"
                style={{ color: 'inherit' }}
              >
                Continue as viewer
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}