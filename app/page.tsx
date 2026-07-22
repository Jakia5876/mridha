'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { FloatingShapes } from '@/components/floating-shapes'
import { ParticleBackground } from '@/components/particle-background'
import { ContactForm } from '@/components/contact-form'
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from '@/components/scroll-animations'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const projects = [
    {
      title: 'Automatic Facebook Post with AI Image',
      category: 'Social Media Automation',
      description: 'Automated daily Facebook posts with AI-generated images using OpenAI and n8n orchestration',
      tags: ['n8n', 'OpenAI', 'Facebook API', 'Image Generation'],
    },
    {
      title: 'Knowledge Base Email Automation',
      category: 'Email Automation',
      description: 'AI-powered email responses using OpenAI chat model with Google Sheets integration for CRM',
      tags: ['n8n', 'OpenAI', 'Email', 'Google Sheets'],
    },
    {
      title: 'Create Auto SMS & Messenger Reply System',
      category: 'Customer Service',
      description: 'Automated SMS and Messenger replies without code using n8n LLM Chain integration',
      tags: ['n8n', 'Webhooks', 'LLM Chain', 'Automation'],
    },
    {
      title: 'Upload Products to Multiple WordPress Sites',
      category: 'WooCommerce Integration',
      description: 'Automated product upload and sync across multiple WordPress/WooCommerce stores simultaneously',
      tags: ['n8n', 'WooCommerce', 'Automation', 'Workflow'],
    },
    {
      title: 'Auto Reply to Customer from Google Sheet',
      category: 'Customer Service Automation',
      description: 'Customer inquiry automation with AI agent processing data from Google Sheets with response tracking',
      tags: ['n8n', 'AI Agent', 'Google Sheets', 'CRM'],
    },
    {
      title: 'Gmail SMTP & cPanel SMTP Setup in n8n',
      category: 'Email Infrastructure',
      description: 'Complete SMTP email configuration for reliable Gmail and cPanel email delivery in n8n workflows',
      tags: ['n8n', 'Email', 'SMTP', 'Setup'],
    },
  ]

  const services = [
    'Social Media Automation',
    'Email Automation',
    'AI Chat Integration',
    'Sales Connector',
    'Lead Generation',
    'WooCommerce Automation',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <ParticleBackground />
      <FloatingShapes />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800 border-slate-800/50">
        <motion.div 
          className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="text-xl font-semibold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Abdul Alim
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="#services" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors pb-2 border-b border-transparent hover:border-cyan-400">
                Services
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="#work" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors pb-2 border-b border-transparent hover:border-cyan-400">
                Portfolio
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="#contact" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors pb-2 border-b border-transparent hover:border-cyan-400">
                Contact
              </Link>
            </motion.div>
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <motion.button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
              <Link
                href="#services"
                className="text-sm text-slate-300 hover:text-cyan-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#work"
                className="text-sm text-slate-300 hover:text-cyan-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="#contact"
                className="text-sm text-slate-300 hover:text-cyan-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <FadeInLeft duration={0.8}>
              <p className="text-sm text-slate-400 mb-6">Welcome to my portfolio</p>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">n8n Automation</span>
                <br />
                <span className="text-white">Specialist</span>
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                I build intelligent automation workflows that transform your business. From AI-powered email systems to multi-channel customer automation, I deliver results without code using n8n.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  href="#contact" 
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all inline-block text-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.a>
                <motion.a 
                  href="#work" 
                  className="px-8 py-3 border border-slate-600 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all inline-block text-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.a>
              </div>
            </FadeInLeft>

            {/* Right Image */}
            <FadeInRight duration={0.8} delay={0.2}>
              <div className="flex justify-center">
                <motion.div 
                  className="relative"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-2xl opacity-20"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <img
                    src="/alim.png"
                    alt="Abdul Alim Mridha"
                    className="relative w-80 h-80 rounded-full object-cover border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
                  />
                </motion.div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 px-6 border-t border-slate-800 bg-slate-900/50 z-10">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <h2 className="text-3xl font-semibold mb-4 text-white">Services</h2>
            <p className="text-slate-400 mb-12 max-w-2xl">Comprehensive automation solutions powered by n8n</p>
          </FadeInUp>
          
          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: '#06b6d4',
                      boxShadow: '0 0 30px rgba(6, 182, 212, 0.2)'
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg mb-4 flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <span className="text-white text-lg font-bold">✓</span>
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-2">{service}</h3>
                    <p className="text-slate-400 text-sm">Streamline your workflows with automated solutions</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="relative py-20 px-6 border-t border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-10">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <h2 className="text-3xl font-semibold mb-4 text-white">Recent Projects</h2>
            <p className="text-slate-400 mb-12">Real-world automation solutions delivered with n8n</p>
          </FadeInUp>
          
          <StaggerContainer delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <StaggerItem key={index}>
                  <motion.article
                    className="group cursor-pointer bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-lg p-8 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 0 40px rgba(6, 182, 212, 0.15)'
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="space-y-4">
                      <div>
                        <motion.p 
                          className="text-xs text-cyan-400 uppercase tracking-widest mb-2"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {project.category}
                        </motion.p>
                        <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag, i) => (
                          <motion.span
                            key={i}
                            className="text-xs px-3 py-1 bg-slate-700/50 text-cyan-300 rounded-full border border-slate-600"
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(6, 182, 212, 0.2)' }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6 border-t border-slate-800 bg-slate-900/50 z-10">
        <div className="max-w-4xl mx-auto">
          <FadeInUp>
            <h2 className="text-3xl font-semibold mb-6 text-white text-center">Let&apos;s Automate Your Business</h2>
            <p className="text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed text-center">
              Ready to transform your workflows with n8n automation? Get in touch to discuss your automation needs.
            </p>
          </FadeInUp>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div 
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-lg p-8 hover:border-cyan-500/50 transition-all"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.15)'
              }}
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <Mail className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              </motion.div>
              <p className="text-slate-300 mb-2">Email</p>
              <a href="mailto:alim01716779220@gmail.com" className="text-cyan-400 hover:text-cyan-300 break-all">
                alim01716779220@gmail.com
              </a>
            </motion.div>
            
            <motion.div 
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-lg p-8 hover:border-cyan-500/50 transition-all"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.15)'
              }}
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}>
                <Phone className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              </motion.div>
              <p className="text-slate-300 mb-2">Phone</p>
              <a href="tel:+8801716779220" className="text-cyan-400 hover:text-cyan-300">
                +880 1716779220
              </a>
            </motion.div>
          </div>

          <FadeInUp delay={0.3}>
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-lg p-12">
              <h3 className="text-2xl font-semibold text-white mb-8">Send Me a Message</h3>
              <ContactForm />
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-800 py-8 px-6 z-10">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <motion.div 
              className="text-slate-400 mb-4 md:mb-0"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-semibold text-white">Abdul Alim Mridha</p>
              <p className="text-sm">n8n Automation Specialist</p>
            </motion.div>
            
            <div className="text-slate-400 text-sm">
              © 2025 Abdul Alim Mridha. All rights reserved.
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  )
}
