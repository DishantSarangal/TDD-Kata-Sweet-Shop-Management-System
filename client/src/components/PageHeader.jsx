import { motion } from "framer-motion"

export default function PageHeader({ title, subtitle }) {
  return (
    <motion.div
      className="page-header"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </motion.div>
  )
}
