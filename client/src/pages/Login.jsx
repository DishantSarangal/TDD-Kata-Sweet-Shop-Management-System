import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

export default function Login(){

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e){
    e.preventDefault()
    setLoading(true)

    try{
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      toast.success("Logged in!")
      navigate('/')
    }catch(e){
      toast.error("Invalid email or password")
    }

    setLoading(false)
  }

  return (
    <div className="auth-wrapper fade-in">

      <motion.div 
        className="auth-card glass premium-card"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >

        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Log in to continue</p>

        <form onSubmit={submit}>

          <label>Email</label>
          <input 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <label>Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <button className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="switch-text">
          Don't have an account? <Link to="/register" className="switch-link">Create one</Link>
        </p>

      </motion.div>

    </div>
  )
}
