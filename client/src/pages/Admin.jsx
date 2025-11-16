import React, { useEffect, useState } from 'react'
import api from '../api'
import PageHeader from '../components/PageHeader'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

export default function Admin() {

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  })

  const [editing, setEditing] = useState(null)
  const [sweetList, setSweetList] = useState([])

  async function load() {
    try {
      const res = await api.get('/sweets')
      setSweetList(res.data)
    } catch {
      toast.error("Could not load sweets.")
    }
  }

  useEffect(() => { load() }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function save(e) {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/sweets/${editing}`, form)
        toast.success("Sweet updated!")
      } else {
        await api.post('/sweets', form)
        toast.success("Sweet added!")
      }
      setForm({ name: "", category: "", price: "", quantity: "" })
      setEditing(null)
      load()
    } catch {
      toast.error("Error saving sweet.")
    }
  }

  async function del(id) {
    if (!window.confirm("Are you sure?")) return
    await api.delete(`/sweets/${id}`)
    load()
  }

  function edit(s) {
    setEditing(s._id)
    setForm({
      name: s.name,
      category: s.category,
      price: s.price,
      quantity: s.quantity
    })
  }

  return (
    <div>
      <PageHeader
        title="Admin Panel 👑"
        subtitle="Manage inventory, update sweets, and more."
      />

      <div className="admin-grid">

        {/* FORM */}
        <motion.form
          className="card"
          onSubmit={save}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>{editing ? "Edit Sweet" : "Add Sweet"}</h2>

          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />

          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />

          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />

          <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />

          <button type="submit">{editing ? "Update" : "Add"}</button>

          {editing && (
            <button type="button" onClick={() => { 
              setEditing(null); 
              setForm({ name: "", category: "", price: "", quantity: "" }) 
            }} style={{ marginTop: 10, background: "#ccc", color: "#000" }}>
              Cancel
            </button>
          )}
        </motion.form>

        {/* Sweet List */}
        <div>
          <div className="grid">
            {sweetList.map(s => (
              <motion.div
                key={s._id}
                className="sweet-card"
                whileHover={{ y: -6 }}
              >
                <h3>{s.name}</h3>
                <p>{s.category}</p>
                <p>₹{s.price}</p>
                <p>Qty: {s.quantity}</p>

                <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                  <button onClick={() => edit(s)} style={{ background: "#6ab7ff" }}>Edit</button>
                  <button onClick={() => del(s._id)} style={{ background: "#ff6b6b" }}>Delete</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
