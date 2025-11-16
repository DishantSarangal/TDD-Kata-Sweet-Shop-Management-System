import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'
import { motion } from 'framer-motion'

export default function Navbar() {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  function logout() {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <motion.nav 
      className="navbar glass-nav"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="nav-left">
        <Link to="/home" className="nav-brand">SweetShop</Link>
      </div>

      <div className="nav-right">
        {user.role === 'admin' && (
          <Link to="/admin" className="nav-link">Admin</Link>
        )}

        <DarkModeToggle />

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </motion.nav>
  )
}
