import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ImageIcon, X, MessageSquare } from 'lucide-react'

interface InputAreaProps {
  onSendMessage: (text: string, image: File | null) => void
}

export default function InputArea({ onSendMessage }: InputAreaProps) {
  const [text, setText] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [inputMode, setInputMode] = useState<'text' | 'image'>('text')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() || image) {
      onSendMessage(text, image)
      setText('')
      setImage(null)
      setInputMode('text')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      // Simulate upload delay
      setTimeout(() => {
        setImage(file)
        setIsUploading(false)
      }, 1500)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4">
      <div className="flex items-center space-x-2 mb-2">
        <motion.button
          type="button"
          onClick={() => setInputMode('text')}
          className={`p-2 rounded-full focus:outline-none ${inputMode === 'text' ? 'bg-teal-500 text-white' : 'text-slate-500'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare size={20} />
        </motion.button>
        <motion.button
          type="button"
          onClick={() => setInputMode('image')}
          className={`p-2 rounded-full focus:outline-none ${inputMode === 'image' ? 'bg-teal-500 text-white' : 'text-slate-500'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ImageIcon size={20} />
        </motion.button>
      </div>
      <div className="flex items-center space-x-2">
        {inputMode === 'text' ? (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 bg-slate-100 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        ) : (
          <div className="flex-1 relative">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-2 bg-slate-100 rounded-full text-left text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {image ? 'Image selected' : 'Choose an image...'}
            </button>
          </div>
        )}
        <motion.button
          type="submit"
          className="p-2 bg-teal-500 text-white rounded-full focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={inputMode === 'text' ? !text.trim() : !image}
        >
          <Send size={20} />
        </motion.button>
      </div>
      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-slate-500"
          >
            <div className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading image...
            </div>
          </motion.div>
        )}
        {image && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 flex items-center space-x-2"
          >
            <img src={URL.createObjectURL(image)} alt="Selected" className="w-10 h-10 object-cover rounded" />
            <span className="text-sm text-slate-500">Image selected</span>
            <button
              type="button"
              onClick={() => setImage(null)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

