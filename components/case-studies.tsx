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

export function CaseStudies() {
  return (
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
  )
}
