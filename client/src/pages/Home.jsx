import React, { useEffect, useState } from 'react'
import api from '../api'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Confetti from 'react-confetti'
import PageHeader from '../components/PageHeader'

export default function Home() {

  const [sweets, setSweets] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [confetti, setConfetti] = useState(false)

  async function fetchAll() {
    setLoading(true)
    try {
      const res = await api.get('/sweets')
      setSweets(res.data)
    } catch (e) {
      toast.error("Unable to fetch sweets.")
    }
    setLoading(false)
  }

  async function search() {
    setLoading(true)
    try {
      const res = await api.get('/sweets/search', { params: { q } })
      setSweets(res.data)
    } catch {
      toast.error("Search failed.")
    }
    setLoading(false)
  }

  // ------------------------------------------
  // 🔥 FIXED PURCHASE FUNCTION (FULLY WORKING)
  // ------------------------------------------
  async function purchase(id) {
    try {
      await api.post(
        `/sweets/${id}/purchase`,
        { amount: 1 }, // backend expects this
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      )

      toast.success("Purchase successful!")
      setConfetti(true)
      setTimeout(() => setConfetti(false), 1500)
      fetchAll()

    } catch (e) {
      toast.error(e.response?.data?.message || "Purchase failed.")
    }
  }

  useEffect(() => { fetchAll() }, [])

  return (
    <div>

      {confetti && <Confetti recycle={false} numberOfPieces={220} />}

      <PageHeader
        title="Explore Sweets 🍬"
        subtitle="Shop your favorite treats with one click!"
      />

      <div className="page-section">

        {/* Toolbar */}
        <div className="toolbar">
          <input
            placeholder="Search sweets..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <button onClick={search}>Search</button>
          <button onClick={fetchAll}>Reset</button>
        </div>

        {/* Empty State */}
        {!loading && sweets.length === 0 && (
          <div className="empty-state">
            <h2>No sweets found 🍭</h2>
            <p>Try adjusting your search filters.</p>
          </div>
        )}

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="sweet-card" key={i}>
                <Skeleton height={24} width="60%" />
                <Skeleton height={18} />
                <Skeleton height={18} />
                <Skeleton height={35} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid">
            {sweets.map(s => (
              <motion.div
                key={s._id}
                className="sweet-card"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <h3>{s.name}</h3>
                <p className="meta">{s.category}</p>
                <p className="price">₹{s.price}</p>
                <p className="qty">Qty: {s.quantity}</p>
                <button
                  disabled={s.quantity === 0}
                  onClick={() => purchase(s._id)}
                >
                  {s.quantity === 0 ? "Out of Stock" : "Purchase"}
                </button>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
