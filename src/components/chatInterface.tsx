import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { MessageSquare } from 'lucide-react'
import MessageList from './msglst'
import Loader from './loader'
import InputArea from './inputArea'

interface Message {
  type: 'user' | 'bot'
  content: string
  image?: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: "Hi, I'm Smokeland Conversation Engine! How can I assist you today?" }
  ])
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  const handleSendMessage = async (text: string, image: File | null) => {
    if (image) {
      const imageUrl = URL.createObjectURL(image)
      setMessages((prev) => [...prev, { type: 'user', content: 'Image uploaded', image: imageUrl }])
    } else {
      setMessages((prev) => [...prev, { type: 'user', content: text }])
    }

    setIsThinking(true)

    const formData = new FormData()
    formData.append('query', text || '')
    if (image) {
      formData.append('image', image)
    }

    try {
      const response = await fetch('https://smokeland-304959215088.us-central1.run.app/api/query', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      
      setMessages((prev) => [...prev, { type: 'bot', content: data.response }])
    } catch (error) {
      console.error('Error:', error)
      setMessages((prev) => [...prev, { type: 'bot', content: "Oops! Something went wrong. Please try again." }])
    } finally {
      setIsThinking(false)
    }
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-[600px] flex flex-col"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-teal-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center">
          <MessageSquare className="w-6 h-6 mr-2" />
          <h2 className="text-xl font-bold">Smokeland Conversation Engine</h2>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <MessageList messages={messages} />
        <AnimatePresence>
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <Loader />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <InputArea onSendMessage={handleSendMessage} />
      <div className="text-center text-xs text-slate-500 p-2 border-t border-slate-200">
        <a href="#" className="hover:underline">Terms</a> | 
        <a href="#" className="hover:underline ml-2">Privacy Policy</a>
      </div>
    </motion.div>
  )
}

