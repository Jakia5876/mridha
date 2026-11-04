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
    // Default to the dark design; use light only if the visitor chose it
    const isLight = localStorage.getItem('theme') === 'light'
    setIsDark(!isLight)
    document.documentElement.classList.toggle('light', isLight)
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
