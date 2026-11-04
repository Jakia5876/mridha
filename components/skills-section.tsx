'use client'

import { motion } from 'framer-motion'
import { Workflow, Users, Code, Bot } from 'lucide-react'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/scroll-animations'

const skillGroups = [
  {
    title: 'Workflow Automation',
    icon: Workflow,
    summary: 'End-to-end business automation that connects your apps and removes manual work.',
    skills: ['n8n', 'Webhooks', 'REST APIs', 'HTTP Requests', 'Google Sheets', 'SMTP / Email'],
  },
  {
    title: 'GoHighLevel CRM & Automation',
    icon: Users,
    summary: 'Complete GoHighLevel setup that captures, nurtures, and converts leads on autopilot.',
    skills: [
      'CRM & Pipeline Setup',
      'Workflow Automation',
      'Funnels & Websites',
      'Forms & Surveys',
      'Calendars & Booking',
      'Email & SMS Campaigns',
      'Snapshots',
      'Reputation Management',
      'Missed-Call Text Back',
    ],
  },
  {
    title: 'Vibe Coding',
    icon: Code,
    summary: 'AI-assisted development that turns ideas into fast, modern websites and web apps.',
    skills: ['Claude Code', 'v0.dev', 'Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Vercel', 'GitHub'],
  },
  {
    title: 'AI & Integrations',
    icon: Bot,
    summary: 'AI agents and chatbots that answer customers and work alongside your team.',
    skills: ['OpenAI / ChatGPT', 'Claude AI', 'AI Agents', 'LLM Chains', 'Facebook Graph API', 'SMS & Messenger', 'WooCommerce', 'WordPress'],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-20 px-6 border-t border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-10">
      <div className="max-w-7xl mx-auto">
        <FadeInUp>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Skills &amp; Tools</p>
          <h2 className="mb-4 text-3xl font-semibold text-white md:text-4xl">What I work with</h2>
          <p className="mb-12 max-w-2xl text-slate-400">
            A practical toolkit across automation, CRM, AI, and modern web development, used to build systems that save
            time and grow revenue.
          </p>
        </FadeInUp>

        <StaggerContainer>
          <div className="grid gap-6 md:grid-cols-2">
            {skillGroups.map((group) => {
              const Icon = group.icon
              return (
                <StaggerItem key={group.title}>
                  <motion.div
                    className="h-full rounded-lg border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-xl transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                    </div>
                    <p className="mb-6 text-sm leading-relaxed text-slate-400">{group.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-slate-600 bg-slate-700/50 px-3 py-1 text-xs text-cyan-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </StaggerItem>
              )
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
