import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

export default function Register(){

  const navigate = useNavigate()
  const [form, setForm] = useState({ 
    name: '',
    email: '',
    password: '',
    role: 'user'
  })
  const [loading, setLoading] = useState(false)

  function update(e){
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function submit(e){
    e.preventDefault()
    setLoading(true)

    try{
      const res = await api.post('/auth/register', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      toast.success("Account created!")
      navigate('/')
    }catch(e){
      toast.error(e.response?.data?.message || "Registration failed")
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

        <h2 className="auth-title">Create your account</h2>
        <p className="auth-sub">Start your SweetShop journey</p>

        <form onSubmit={submit}>

          <label>Name</label>
          <input 
            name="name" 
            value={form.name}
            onChange={update}
            placeholder="John Doe"
            required
          />

          <label>Email</label>
          <input 
            name="email" 
            value={form.email}
            onChange={update}
            placeholder="you@example.com"
            required
          />

          <label>Password</label>
          <input 
            type="password"
            name="password"
            value={form.password}
            onChange={update}
            placeholder="••••••••"
            required
          />

          <label>Role</label>
          <select name="role" value={form.role} onChange={update}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button className="btn" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="switch-text">
          Already have an account? <Link to="/login" className="switch-link">Log in</Link>
        </p>

      </motion.div>

    </div>
  )
}
