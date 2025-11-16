import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

const candies = ["🍩","🍭","🍪","🧁","🍬","🍫"]
const shapes = ["◯", "◆", "△", "⬢", "⯁"]

export default function CandyBG() {

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Track mouse position for parallax
  useEffect(() => {
    const handleMove = e => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  // Combine candies + shapes
  const elements = [...candies, ...shapes]

  return (
    <div className="candy-bg">
      {elements.map((item, i) => (
        <motion.div
          key={i}
          className="candy-item"
          initial={{ opacity: 0, y: 40 }}
          animate={{ 
            opacity: 0.45,  // More visible
            y: [-18, 18, -18] 
          }}
          transition={{ 
            duration: 5 + i,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}

          // Parallax movement
          style={{
            transform: `translate(${mousePos.x * (i % 2 === 0 ? 30 : -20)}px, 
                                   ${mousePos.y * (i % 2 === 0 ? 20 : -15)}px)`
          }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  )
}
