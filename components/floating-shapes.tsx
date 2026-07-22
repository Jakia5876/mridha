'use client'

import { motion } from 'framer-motion'

export function FloatingShapes() {
  const shapes = [
    {
      id: 1,
      size: 120,
      color: 'from-cyan-500/20 to-transparent',
      x: '10%',
      y: '10%',
      duration: 20,
    },
    {
      id: 2,
      size: 80,
      color: 'from-blue-500/20 to-transparent',
      x: '80%',
      y: '20%',
      duration: 25,
    },
    {
      id: 3,
      size: 100,
      color: 'from-purple-500/20 to-transparent',
      x: '15%',
      y: '70%',
      duration: 22,
    },
    {
      id: 4,
      size: 90,
      color: 'from-cyan-400/15 to-transparent',
      x: '75%',
      y: '75%',
      duration: 28,
    },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute bg-gradient-to-br ${shape.color} rounded-full blur-3xl`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
