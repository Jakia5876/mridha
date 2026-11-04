'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

const caseStudies = [
  {
    title: 'AI-Powered Social Media Engine',
    category: 'Social Media Automation',
    image: '/workflow-1.jpg',
    problem: 'Creating consistent, visual Facebook content manually was slow and difficult to scale.',
    solution: 'An n8n workflow reads content from Google Sheets, generates copy and imagery with AI, publishes through the Facebook Graph API, and updates the source row.',
    outcome: 'A repeatable content pipeline that reduces publishing work and keeps every post tracked.',
    tools: ['n8n', 'OpenAI', 'Facebook Graph API', 'Google Sheets'],
  },
  {
    title: 'Automated Customer Reply Desk',
    category: 'AI Customer Service',
    image: '/workflow-5.jpg',
    problem: 'Customer questions needed fast, consistent answers without a full-time support desk.',
    solution: 'A webhook receives inbound messages, routes the request through an AI agent, checks a Google Sheets knowledge base, and sends a tailored response.',
    outcome: 'Faster replies with a centralized knowledge source and a workflow that can be extended to new channels.',
    tools: ['n8n', 'AI Agent', 'Webhooks', 'Google Sheets'],
  },
  {
    title: 'Multi-Store Product Publisher',
    category: 'E-commerce Automation',
    image: '/workflow-4.jpg',
    problem: 'Publishing the same product across multiple WordPress stores created repetitive operational work.',
    solution: 'A form submission triggers image upload, product creation, and follow-up HTTP requests for multiple WooCommerce destinations.',
    outcome: 'One submission can coordinate product publishing across several stores with less manual duplication.',
    tools: ['n8n', 'WooCommerce', 'WordPress', 'HTTP Request'],
  },
]

const clientReviews = [
  {
    quote: 'Abdul turned a repetitive publishing process into a reliable system our team can actually trust. The workflow saved us hours every week.',
    name: 'Operations Lead',
    company: 'U.S. E-commerce Brand',
    location: 'United States',
  },
  {
    quote: 'The AI customer reply workflow gave us faster response times without losing the personal touch. Abdul understood the business problem first.',
    name: 'Customer Experience Manager',
    company: 'U.S. SaaS Company',
    location: 'United States',
  },
  {
    quote: 'Clear communication, thoughtful automation, and a smooth handoff. We finally have a repeatable email system instead of manual follow-ups.',
    name: 'Founder',
    company: 'U.S. Marketing Agency',
    location: 'United States',
  },
]

export function CaseStudies() {
  return (
    <div className="space-y-16">
      <div className="grid gap-5 md:grid-cols-3">
        {clientReviews.map((review, index) => (
          <motion.figure
            key={review.company}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="flex h-full flex-col rounded-2xl border border-slate-700 bg-slate-800/40 p-6 backdrop-blur-xl"
          >
            <div className="mb-5 flex gap-1 text-cyan-400" aria-label="5 out of 5 stars">★★★★★</div>
            <blockquote className="flex-1 text-sm leading-6 text-slate-200">&ldquo;{review.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 border-t border-slate-700 pt-4">
              <p className="font-semibold text-white">{review.name}</p>
              <p className="text-sm text-slate-400">{review.company}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-cyan-400">{review.location}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="space-y-8">
      {caseStudies.map((study, index) => (
        <motion.article
          key={study.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: index * 0.08 }}
          className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-xl"
        >
          <div className="grid lg:grid-cols-[1.05fr_1fr]">
            <div className="relative min-h-64 overflow-hidden bg-slate-950 lg:min-h-full">
              <img
                src={study.image}
                alt={`${study.title} n8n workflow diagram`}
                className="h-full min-h-64 w-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-7 md:p-9">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">{study.category}</p>
              <h3 className="mb-5 text-2xl font-semibold text-white">{study.title}</h3>
              <div className="space-y-4 text-sm leading-6 text-slate-300">
                <p><span className="font-semibold text-white">Challenge:</span> {study.problem}</p>
                <p><span className="font-semibold text-white">Approach:</span> {study.solution}</p>
                <p className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" /><span><span className="font-semibold text-white">Result:</span> {study.outcome}</span></p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {study.tools.map((tool) => <span key={tool} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">{tool}</span>)}
              </div>
              <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">View workflow details <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></div>
            </div>
          </div>
        </motion.article>
      ))}
      </div>
    </div>
  )
}
