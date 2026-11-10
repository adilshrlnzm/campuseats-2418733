import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { authErrorMessage } from '../authErrors.js'

function LoginPage() {
  // 1. Grab resetPassword from the context
  const { login, loginWithGoogle, resetPassword } = useAuth() 
  const navigate = useNavigate()
  const location = useLocation()
  const goTo = location.state?.from ?? '/'
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('') // 2. Add success state
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccessMsg('')
    setBusy(true)
    try {
      await login(email, password)
      navigate(goTo, { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  async function handleGoogle() {
    setError('')
    setSuccessMsg('')
    try {
      await loginWithGoogle()
      navigate(goTo, { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
    }
  }

  // 3. Add the forgot password handler
  async function handleForgotPassword() {
  setError('')
  setSuccessMsg('')

  if (!email) {
    setError('Please enter your email address first.')
    return
  }

  setBusy(true)
  try {
    await resetPassword(email)
    setSuccessMsg(`Password reset email sent to ${email}. Check your inbox!`)
  } catch (err) {
    // Check for the "user not found" error
    if (err.code === 'auth/user-not-found') {
      setError('No account found with this email address. Please check the email or register a new account.')
    } else {
      setError(authErrorMessage(err)) // Your existing error handler
    }
  } finally {
    setBusy(false)
  
}
  }

  return (
    <section className="auth-page">
      <form className="card form" onSubmit={handleSubmit}>
        <h2>Log in</h2>
        
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />

        {/* 4. Display Success or Error messages */}
        {successMsg && <p style={{ color: '#1b7a3a', fontSize: '0.85rem', margin: '0.5rem 0' }}>{successMsg}</p>}
        {error && <p className="field-error" role="alert">{error}</p>}

        <button type="submit" className="btn" disabled={busy}>
          {busy ? 'Logging in…' : 'Log in'}
        </button>
        
        <button type="button" className="btn btn-outline" onClick={handleGoogle}>
          Continue with Google
        </button>

        {/* 5. Add the Forgot Password link */}
        <button 
          type="button" 
          onClick={handleForgotPassword} 
          className="link" 
          style={{ color: 'var(--muted)', marginTop: '0.75rem', fontSize: '0.9rem' }}
          disabled={busy}
        >
          Forgot password?
        </button>

        <p className="muted">No account? <Link to="/register"
          state={location.state}>Register</Link></p>
      </form>
    </section>
  )
}

export default LoginPage