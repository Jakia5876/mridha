'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const workflows = [
  {
    id: 1,
    title: 'Automatic Facebook Post with AI Image',
    description: 'AI-powered social media automation with image generation',
    image: '/workflow-1.jpg',
    category: 'Social Media'
  },
  {
    id: 2,
    title: 'Knowledge Base Email Automation',
    description: 'AI-powered email responses using OpenAI integration',
    image: '/workflow-2.jpg',
    category: 'Email'
  },
  {
    id: 3,
    title: 'Gmail SMTP & cPanel SMTP Setup',
    description: 'Email infrastructure configuration and automation',
    image: '/workflow-3.jpg',
    category: 'Email'
  },
  {
    id: 4,
    title: 'Upload Products to Multiple WordPress',
    description: 'Multi-site WooCommerce product automation',
    image: '/workflow-4.jpg',
    category: 'E-commerce'
  },
  {
    id: 5,
    title: 'Auto Reply to Customer from Google Sheet',
    description: 'Customer service automation with AI Agent',
    image: '/workflow-5.jpg',
    category: 'Customer Service'
  },
]

export function WorkflowGallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((workflow, index) => (
          <motion.div
            key={workflow.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => setSelectedId(workflow.id)}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-lg bg-slate-800/50 backdrop-blur-xl border border-slate-700 hover:border-cyan-500/50 transition-all">
              <motion.div
                className="relative w-full aspect-video overflow-hidden bg-slate-900"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src={workflow.image}
                  alt={workflow.title}
                  className="w-full h-full object-contain p-2"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-cyan-400 uppercase tracking-widest font-semibold">
                    {workflow.category}
                  </span>
                  <motion.div
                    className="text-xs px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    View
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {workflow.title}
                </h3>
                <p className="text-sm text-slate-400">{workflow.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 bg-slate-800 hover:bg-slate-700 rounded-lg p-2 transition-colors"
              >
                <X size={24} className="text-white" />
              </button>

              <div className="max-h-[80vh] overflow-auto flex items-center justify-center bg-slate-950 p-4">
                <img
                  src={workflows.find(w => w.id === selectedId)?.image}
                  alt="workflow"
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                />
              </div>

              <div className="p-6 border-t border-slate-700">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {workflows.find(w => w.id === selectedId)?.title}
                </h3>
                <p className="text-slate-300">
                  {workflows.find(w => w.id === selectedId)?.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
