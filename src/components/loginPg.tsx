import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, MessageSquare } from "lucide-react";
import { useRouter } from 'next/navigation';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the credentials
    onLogin()
  }

  return (
    <motion.div
      className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Smokeland Conversation Engine
        </h1>
        <p className="text-slate-600 mt-2">
          Your AI-powered assistant at your service.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Email
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Password
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>
        <motion.button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign in
        </motion.button>
      </form>
      {message && (
        <motion.div
          className="mt-4 text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p
            className={
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }
          >
            {message}
          </p>
        </motion.div>
      )}
      <div className="mt-6 flex items-center justify-center">
        <MessageSquare className="h-5 w-5 text-teal-500 mr-2" />
        <span className="text-sm text-slate-600">
          Powered by Smokeland Conversation Engine
        </span>
      </div>
    </motion.div>
  );
}
