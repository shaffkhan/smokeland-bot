import { motion } from 'framer-motion'
import { User, Bot } from 'lucide-react'

interface Message {
  type: 'user' | 'bot'
  content: string
}

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex items-start max-w-xs lg:max-w-md xl:max-w-lg ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-teal-500' : 'bg-slate-500'}`}>
              {message.type === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
            </div>
            <div
              className={`px-4 py-2 rounded-lg ${
                message.type === 'user' ? 'bg-teal-500 text-white mr-2' : 'bg-slate-100 text-slate-800 ml-2'
              }`}
            >
              {message.content}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

