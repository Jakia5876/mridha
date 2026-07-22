'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
      document.documentElement.classList.toggle('light', savedTheme === 'light')
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(prefersDark)
      document.documentElement.classList.toggle('light', !prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    // Save preference
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
    
    // Update DOM
    document.documentElement.classList.toggle('light', !newIsDark)
    
    // Update document element
    if (newIsDark) {
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
    }
  }

  if (!mounted) return null

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-700 transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon size={20} className="text-cyan-400" />
        ) : (
          <Sun size={20} className="text-yellow-400" />
        )}
      </motion.div>
    </motion.button>
  )
}
