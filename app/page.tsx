'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Mail, Phone, ExternalLink } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-xl font-semibold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Abdul Alim</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <Link href="#services" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">
              Services
            </Link>
            <Link href="#work" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">
              Portfolio
            </Link>
            <Link href="#contact" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

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
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-slate-400 mb-6">Welcome to my portfolio</p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">n8n Automation</span>
            <br />
            <span className="text-white">Specialist</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
            I build intelligent automation workflows that transform your business. From AI-powered email systems to multi-channel customer automation, I deliver results without code using n8n.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a href="#contact" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all inline-block text-center">
              Get Started
            </a>
            <a href="#work" className="px-8 py-3 border border-slate-600 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all inline-block text-center">
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-white">Services</h2>
          <p className="text-slate-400 mb-12 max-w-2xl">Comprehensive automation solutions powered by n8n</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">✓</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{service}</h3>
                <p className="text-slate-400 text-sm">Streamline your workflows with automated solutions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-6 border-t border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-white">Recent Projects</h2>
          <p className="text-slate-400 mb-12">Real-world automation solutions delivered with n8n</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <article
                key={index}
                className="group cursor-pointer bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-lg p-8 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-cyan-400 uppercase tracking-widest mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-slate-700/50 text-cyan-300 rounded-full border border-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-white">Let&apos;s Automate Your Business</h2>
          <p className="text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your workflows with n8n automation? Get in touch to discuss your automation needs.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-lg p-8 hover:border-cyan-500/50 transition-all">
              <Mail className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <p className="text-slate-300 mb-2">Email</p>
              <a href="mailto:alim01716779220@gmail.com" className="text-cyan-400 hover:text-cyan-300 break-all">
                alim01716779220@gmail.com
              </a>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-lg p-8 hover:border-cyan-500/50 transition-all">
              <Phone className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <p className="text-slate-300 mb-2">Phone</p>
              <a href="tel:+8801716779220" className="text-cyan-400 hover:text-cyan-300">
                +880 1716779220
              </a>
            </div>
          </div>

          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
            Send Me a Message
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="text-slate-400 mb-4 md:mb-0">
              <p className="font-semibold text-white">Abdul Alim Mridha</p>
              <p className="text-sm">n8n Automation Specialist</p>
            </div>
            
            <div className="text-slate-400 text-sm">
              © 2025 Abdul Alim Mridha. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
