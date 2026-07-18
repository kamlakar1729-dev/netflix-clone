import React, { useState } from 'react'
import './Login.css'
import logo from '../../Assets/logo.png'
import {login, singup} from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (mode === 'signup' && password !== confirmPassword) {
      alert('Passwords do not match')
      setLoading(false)
      return
    }

    if (mode === 'signin') {
      await login(email, password)
      setLoading(false)
      return
    }

    await singup(name, email, password)
  }

  const toggleMode = (next) => setMode(next)


  return (
    loading ? (
      <div className='spinner-container'>
        <img src={netflix_spinner} alt="Loading..." className='spinner' />
      </div>
    ) : 
    <div className='login'>
      <img src={logo} alt="App logo" className='logo' />
      <div className="login-form">
        <h1>{mode === 'signin' ? 'Sign In' : 'sign up'}</h1>
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder='Enter your name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </>
          )}

          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder='Enter your email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder='Enter your password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {mode === 'signup' && (
            <>
              <label htmlFor="confirm" className="sr-only">Confirm password</label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                placeholder='Confirm your password'
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          <button type="submit" className="btn">{mode === 'signin' ? 'Sign In' : 'Sign Up'}</button>

          <div className="form-help">
            <div className="remember">
              <input id="remember" type="checkbox" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <p className="need-help">Need help?</p>
          </div>
        </form>

        <div className="form-switch">
          {mode === 'signin' ? (
            <p>New to Netflix? <span role="button" tabIndex={0} className="link" onClick={() => toggleMode('signup')} onKeyDown={(e)=> e.key==='Enter' && toggleMode('signup')}>Sign up now</span></p>
          ) : (
            <p>Have an account? <span role="button" tabIndex={0} className="link" onClick={() => toggleMode('signin')} onKeyDown={(e)=> e.key==='Enter' && toggleMode('signin')}>Sign in</span></p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login