'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoginPage from '@/components/loginPg'
import ChatInterface from '@/components/chatInterface'


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <LoginPage onLogin={() => setIsLoggedIn(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ChatInterface />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

