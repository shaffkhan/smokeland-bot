import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center space-x-2 text-slate-500"
    >
      <span className="text-sm">Smokeland Bot is thinking</span>
      <motion.div
        className="flex space-x-1"
        initial="start"
        animate="end"
        variants={{
          start: {
            transition: {
              staggerChildren: 0.2,
            },
          },
          end: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {[0, 1, 2].map((_, i) => (
          <motion.span
            key={i}
            className="w-2 h-2 bg-teal-500 rounded-full"
            variants={{
              start: {
                y: 0,
              },
              end: {
                y: [0, -6, 0],
              },
            }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

