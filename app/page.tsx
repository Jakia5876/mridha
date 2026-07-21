'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ExternalLink } from 'lucide-react'

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'Design / Development',
      description: 'A modern online store with seamless checkout',
      tags: ['Design', 'Frontend', 'Backend'],
    },
    {
      title: 'Mobile App Design',
      category: 'Design / UX',
      description: 'User-centered mobile application interface',
      tags: ['Design', 'Mobile', 'UX/UI'],
    },
    {
      title: 'Brand Identity',
      category: 'Branding',
      description: 'Complete visual identity system',
      tags: ['Branding', 'Design', 'Typography'],
    },
    {
      title: 'Web Platform Redesign',
      category: 'Design / Frontend',
      description: 'Modernizing legacy web experience',
      tags: ['Design', 'Frontend', 'Performance'],
    },
    {
      title: 'Interactive Installation',
      category: 'Creative Coding',
      description: 'Real-time data visualization',
      tags: ['Development', 'Creative', 'Animation'],
    },
    {
      title: 'SaaS Dashboard',
      category: 'Product Design',
      description: 'Data management and analytics interface',
      tags: ['Design', 'Product', 'UX'],
    },
  ]

  const services = [
    'UI/UX Design',
    'Web Development',
    'Brand Strategy',
    'Creative Direction',
    'Product Design',
    'Interactive Experiences',
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-xl font-semibold tracking-tight">Portfolio</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <Link href="#work" className="text-sm hover:text-accent transition-colors">
              Work
            </Link>
            <Link href="#info" className="text-sm hover:text-accent transition-colors">
              Information
            </Link>
            <Link href="#contact" className="text-sm hover:text-accent transition-colors">
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
          <div className="md:hidden border-t border-border bg-background">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
              <Link
                href="#work"
                className="text-sm hover:text-accent transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Work
              </Link>
              <Link
                href="#info"
                className="text-sm hover:text-accent transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Information
              </Link>
              <Link
                href="#contact"
                className="text-sm hover:text-accent transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-neutral-500 mb-6">Hello there</p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
            I&apos;m a designer and developer passionate about creating beautiful digital experiences.
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
            I combine thoughtful design with clean code to build products that are both functional and delightful. Currently exploring the intersection of design and technology.
          </p>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-16">Selected Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <article
                key={index}
                className="group cursor-pointer"
              >
                <div className="mb-6 bg-neutral-100 dark:bg-neutral-900 aspect-video rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-neutral-400">
                    [Project Image]
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 rounded-full"
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

      {/* Information Section */}
      <section id="info" className="py-20 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12">About</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                With 8+ years of experience in digital design and development, I&apos;ve worked with startups, agencies, and established brands to bring their visions to life.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                My approach combines user-centered design thinking with technical expertise, ensuring every project is both beautiful and functional.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-6">Services</h3>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-neutral-600 dark:text-neutral-400">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Let&apos;s Work Together</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            I&apos;m always interested in hearing about new projects and opportunities. Feel free to reach out.
          </p>
          
          <div className="space-y-4">
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded hover:opacity-90 transition-opacity"
            >
              Send me an email
              <ExternalLink size={16} />
            </a>
            <div className="flex justify-center gap-8 pt-8">
              <a href="#" className="text-sm text-neutral-500 hover:text-foreground transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-sm text-neutral-500 hover:text-foreground transition-colors">
                Twitter
              </a>
              <a href="#" className="text-sm text-neutral-500 hover:text-foreground transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 text-center text-sm text-neutral-500">
        <p>© 2024 Portfolio. All rights reserved.</p>
      </footer>
    </div>
  )
}
