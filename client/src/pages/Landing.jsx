import React from 'react'
import { Link } from 'react-router-dom'
import ParticlesBg from './ParticlesBg'
import { motion } from 'framer-motion'

export default function Landing(){
  return (
    <div className="landing-wrapper">
      
      {/* Background particles */}
      <ParticlesBg className="particles-layer" />

      <motion.div 
        className="landing-container fade-in"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="hero-title">Welcome to SweetShop 🍬</h1>
        <p className="hero-sub">Indulge in sweetness. Manage with simplicity.</p>

        <div className="hero-actions">
          <Link to="/register"><button className="btn">Get Started</button></Link>
          <Link to="/login"><button className="btn-muted">Login</button></Link>
        </div>
      </motion.div>
    </div>
  )
}
