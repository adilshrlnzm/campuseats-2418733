import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { authErrorMessage } from '../authErrors.js'

function RegisterPage() {
  // CHANGE 2: Use register instead of login/loginWithGoogle
  const { register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const goTo = location.state?.from ?? '/'

  // CHANGE 1: Add name state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    // CHANGE 3: Validate the name first
    if (name.trim().length < 3) {
      setError('Enter your name (at least 3 characters).')
      return // Stop here, don't try to register
    }

    setBusy(true)
    try {
      // CHANGE 3: Call register with the trimmed name
      await register(name.trim(), email, password)
      navigate(goTo, { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="card form" onSubmit={handleSubmit}>
        {/* CHANGE 1: Update heading */}
        <h2>Create an account</h2>

        {/* CHANGE 1: Add Name Input */}
        <label htmlFor="name">Name</label>
        <input 
          id="name" 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label htmlFor="password">Password</label>
        <input 
          id="password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        {error && <p className="field-error" role="alert">{error}</p>}

        {/* CHANGE 4: Update button text */}
        <button type="submit" className="btn" disabled={busy}>
          {busy ? 'Creating…' : 'Register'}
        </button>

        {/* CHANGE 2: Google button removed */}

        {/* CHANGE 4: Update bottom link */}
        <p className="muted">
          Already registered? <Link to="/login" state={location.state}>Log in</Link>
        </p>
      </form>
    </section>
  )
}

export default RegisterPage