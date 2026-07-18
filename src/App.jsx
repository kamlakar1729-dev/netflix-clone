import React, { useEffect } from 'react'
import Home from './Pages/Home/Home'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Player from './Pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user)
        if (location.pathname === '/login') {
          navigate('/')
        }
      } else {
        console.log('No user is signed in.')
        if (location.pathname !== '/login') {
          navigate('/login')
        }
      }
    })

    return () => unsubscribe()
  }, [navigate, location.pathname])

 
  return (
    <div>
      <ToastContainer theme="dark"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/player/:id" element={<Player/>} />
        <Route path="/player" element={<Player/>} />
      </Routes>
    </div>
  )
}

export default App