import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CandyBG from './components/CandyBG'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import { initTheme } from './theme'

initTheme()

// ---------------- AUTH GUARD ----------------
function RequireAuth({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

// ---------------- PAGE TRANSITION WRAPPER ----------------
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// ---------------- MAIN APP ----------------
export default function App() {

  const token = localStorage.getItem('token')
  const location = useLocation()

  return (
    <>
     {token && <Navbar />}
     <CandyBG />

      <div className="container">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            {/* SMART ROOT ROUTE */}
            <Route 
              path="/" 
              element={
                token 
                  ? <Navigate to="/home" replace /> 
                  : <Navigate to="/register" replace />
              } 
            />

            {/* PUBLIC ROUTES */}
            <Route 
              path="/login" 
              element={<PageWrapper><Login /></PageWrapper>} 
            />
            <Route 
              path="/register" 
              element={
                token 
                  ? <Navigate to="/home" replace />
                  : <PageWrapper><Register /></PageWrapper>
              } 
            />

            {/* PROTECTED ROUTES */}
            <Route 
              path="/home" 
              element={<PageWrapper><RequireAuth><Home /></RequireAuth></PageWrapper>} 
            />
            <Route 
              path="/admin" 
              element={<PageWrapper><RequireAuth><Admin /></RequireAuth></PageWrapper>} 
            />

            {/* CATCH ALL */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </AnimatePresence>
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={2200}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </>
  )
}
