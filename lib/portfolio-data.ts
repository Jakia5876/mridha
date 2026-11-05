/* =========================================================
   PORTFOLIO DATA — ওয়েবসাইটের সব কন্টেন্ট এখানে।
   এখন: এই ফাইল এডিট করলেই সাইট আপডেট হয়।
   পরে: Supabase যুক্ত হলে /admin প্যানেল থেকে আপডেট হবে,
        আর এই ফাইলটা ব্যাকআপ (fallback) হিসেবে থাকবে।
   ========================================================= */

export type Meter = { label: string; value: number }
export type Highlight = { kicker: string; title: string; caption: string }
export type Service = { title: string; desc: string }
export type CaseStudy = {
  title: string
  type: string
  image: string
  tags: string[]
  challenge: string
  approach: string
  result: string
  link?: string
}
export type Project = { title: string; desc: string; image: string; tags: string[]; link?: string }
export type WebProject = {
  title: string
  category: string // e.g. "SaaS", "Website", "Web App"
  desc: string
  url: string
  image: string
  tags: string[]
  featured?: boolean // বড় করে দেখাবে
}
export type SkillGroup = { group: string; items: string[] }
export type Testimonial = { quote: string; name: string; company: string }

export type Profile = {
  firstName: string
  lastName: string
  fullName: string
  role: string
  heroWord: string
  disciplines: string[]
  intro: string
  about: string
  photo: string
  email: string
  phone: string
  location: string
  resume?: string
  socials: Record<string, string>
  meters: Meter[]
}

export type Portfolio = {
  profile: Profile
  highlights: Highlight[]
  tools: string[]
  services: Service[]
  caseStudies: CaseStudy[]
  projects: Project[]
  webProjects: WebProject[]
  skills: SkillGroup[]
  testimonials: Testimonial[]
}

export const portfolioData: Portfolio = {
  profile: {
    firstName: 'ABDUL',
    lastName: 'ALIM',
    fullName: 'Abdul Alim Mridha',
    role: 'AI Automation & Vibe Coding Specialist',
    heroWord: 'AUTOMATOR',
    disciplines: ['AI Automation', 'GoHighLevel CRM', 'Vibe Coding'],
    intro:
      'I help businesses save time and grow revenue with n8n workflow automation, GoHighLevel CRM systems, AI chatbots and vibe-coded websites.',
    about:
      'I design automation systems that quietly do the repetitive work — connecting apps, nurturing leads, answering customers and publishing content — so business owners can focus on growth. From n8n workflows and GoHighLevel CRM builds to AI agents and modern websites built with Claude Code and Next.js, every system I deliver is reliable, documented and easy to hand off.',
    photo: '/alim.png',
    email: 'alim01716779220@gmail.com',
    phone: '+880 1716779220',
    location: 'Bangladesh · Working worldwide',
    resume: '', // CV-র লিংক, যেমন "/cv.pdf" (ফাইলটা public/ ফোল্ডারে রাখুন)
    // সোশ্যাল লিংক — খালি ("") থাকলে দেখাবে না
    socials: {
      LinkedIn: 'https://www.linkedin.com/in/abdul-alim-mridha-86647b228/',
      X: 'https://x.com/mridha_alim',
      YouTube: 'https://www.youtube.com/@a3mittech',
      Facebook: 'https://www.facebook.com/a3mittech',
      GitHub: '',
      Upwork: '',
      Fiverr: '',
    },
    // ফোন মকআপে দেখানো স্কিল বার
    meters: [
      { label: 'AI Automation', value: 96 },
      { label: 'GoHighLevel', value: 92 },
      { label: 'Vibe Coding', value: 90 },
    ],
  },

  // হিরো সেকশনের বাম পাশের স্লাইডিং কার্ড
  highlights: [
    { kicker: 'Specialist', title: 'AI Automation', caption: 'Custom workflows, webhooks & API integrations.' },
    { kicker: 'Expert', title: 'GoHighLevel CRM', caption: 'Pipelines, funnels, snapshots & follow-ups.' },
    { kicker: 'Builder', title: 'Vibe Coding', caption: 'Next.js websites built with Claude Code & v0.' },
  ],

  tools: [
    'n8n', 'GoHighLevel', 'OpenAI', 'Claude AI', 'Next.js', 'React', 'Tailwind CSS',
    'Vercel', 'Google Sheets', 'WooCommerce', 'WordPress', 'Facebook Graph API', 'Webhooks', 'REST APIs',
  ],

  services: [
    { title: 'n8n Workflow Automation', desc: 'Custom n8n workflows that connect your apps, sync data, and eliminate repetitive manual tasks.' },
    { title: 'GoHighLevel CRM Setup', desc: 'Full GoHighLevel account setup: pipelines, contacts, custom fields, calendars, and snapshots.' },
    { title: 'GoHighLevel Automation & Funnels', desc: 'Lead-nurturing workflows, high-converting funnels, and follow-up sequences that run on autopilot.' },
    { title: 'Vibe-Coded Websites & Apps', desc: 'Modern, fast websites and web apps built with AI-assisted development using Next.js and Vercel.' },
    { title: 'AI Chatbots & Agents', desc: 'AI agents that answer customer questions 24/7 using your own knowledge base.' },
    { title: 'Email & SMS Automation', desc: 'Automated email and SMS campaigns, smart replies, and reliable SMTP delivery setup.' },
    { title: 'Social Media Automation', desc: 'Scheduled, AI-generated posts and images published automatically to your social channels.' },
    { title: 'Lead Generation & Sales Pipelines', desc: 'Capture, qualify, and route leads into your CRM so your sales team never misses an opportunity.' },
    { title: 'E-commerce Automation', desc: 'WooCommerce and WordPress automation for product uploads, multi-store sync, and order workflows.' },
  ],

  // বড় করে দেখানো কেস স্টাডি
  caseStudies: [
    {
      title: 'AI-Powered Social Media Engine',
      type: 'Content Automation',
      image: '/workflow-1.jpg',
      tags: ['n8n', 'OpenAI', 'Facebook Graph API', 'Google Sheets'],
      challenge: 'Creating consistent, visual Facebook content manually was slow and difficult to scale.',
      approach: 'An n8n workflow reads content from Google Sheets, generates copy and imagery with AI, and publishes to Facebook automatically.',
      result: 'A repeatable content pipeline that reduces publishing work and keeps every post tracked.',
      link: '',
    },
    {
      title: 'Automated Customer Reply Desk',
      type: 'AI Support Agent',
      image: '/workflow-5.jpg',
      tags: ['n8n', 'AI Agent', 'Webhooks', 'Google Sheets'],
      challenge: 'Customer questions needed fast, consistent answers without a full-time support desk.',
      approach: 'A webhook receives inbound messages, routes the request through an AI agent and checks a Google Sheets knowledge base before replying.',
      result: 'Faster replies with a centralized knowledge source and a workflow that can be extended to new channels.',
      link: '',
    },
    {
      title: 'Multi-Store Product Publisher',
      type: 'E-commerce Automation',
      image: '/workflow-4.jpg',
      tags: ['n8n', 'WooCommerce', 'WordPress', 'HTTP Request'],
      challenge: 'Publishing the same product across multiple WordPress stores created repetitive operational work.',
      approach: 'A form submission triggers image upload, product creation and follow-up HTTP requests for every store.',
      result: 'One submission can coordinate product publishing across several stores with less manual duplication.',
      link: '',
    },
  ],

  // ছোট প্রজেক্ট কার্ড গ্রিড
  projects: [
    { title: 'Automatic Facebook Post with AI Image', desc: 'Automated daily Facebook posts with AI-generated images using OpenAI and n8n orchestration.', image: '/workflow-1.jpg', tags: ['n8n', 'OpenAI', 'Facebook API'], link: '' },
    { title: 'Knowledge Base Email Automation', desc: 'AI-powered email responses using OpenAI chat model with Google Sheets integration for CRM.', image: '/workflow-2.jpg', tags: ['n8n', 'OpenAI', 'Email'], link: '' },
    { title: 'Auto SMS & Messenger Reply System', desc: 'Automated SMS and Messenger replies without code using n8n LLM Chain integration.', image: '/workflow-3.jpg', tags: ['n8n', 'Webhooks', 'LLM Chain'], link: '' },
    { title: 'Upload Products to Multiple WordPress Sites', desc: 'Automated product upload and sync across multiple WordPress/WooCommerce stores simultaneously.', image: '/workflow-4.jpg', tags: ['n8n', 'WooCommerce'], link: '' },
    { title: 'Auto Reply to Customer from Google Sheet', desc: 'Customer inquiry automation with AI agent processing data from Google Sheets with response tracking.', image: '/workflow-5.jpg', tags: ['AI Agent', 'Google Sheets'], link: '' },
    { title: 'Gmail SMTP & cPanel SMTP Setup in n8n', desc: 'Complete SMTP email configuration for reliable Gmail and cPanel email delivery in n8n workflows.', image: '/workflow-2.jpg', tags: ['n8n', 'SMTP'], link: '' },
  ],

  // লাইভ ওয়েবসাইট / SaaS প্রজেক্ট (ব্রাউজার-উইন্ডো কার্ড)
  webProjects: [
    { title: 'Wasend-Pro', category: 'SaaS', featured: true, url: 'https://wasend-pro.vercel.app/', image: '/projects/wasend-pro.jpg', tags: ['SaaS', 'Admin Panel'], desc: 'A SaaS platform with a secure admin panel and account management — built and deployed end-to-end.' },
    { title: 'Nexora SMM', category: 'Web App', url: 'https://nexora-smm.vercel.app/', image: '/projects/nexora-smm.jpg', tags: ['SMM Panel', 'bKash', 'API'], desc: 'Automated social media marketing panel for Facebook, YouTube, Instagram, TikTok and Telegram — with instant API orders and local bKash payments.' },
    { title: 'A3M Social Post Creator', category: 'AI Tool', url: 'https://social-media-post-gamma.vercel.app/', image: '/projects/a3m-social-post.jpg', tags: ['AI', 'Content', 'Bangla / English'], desc: 'AI post generator: describe an idea and get ready-to-publish titles, descriptions, hashtags and thumbnails for YouTube, TikTok, Facebook, Instagram, LinkedIn and X.' },
    { title: 'Autofloy', category: 'E-commerce', url: 'https://autofloy-orcin.vercel.app/', image: '/projects/autofloy.jpg', tags: ['Digital Products', 'Store'], desc: 'Digital goods store with curated templates, e-books, AI tools and resources — categories, search, wishlist and cart.' },
    { title: 'Resumely — CV Builder', category: 'Web App', url: 'https://resumely-ruddy.vercel.app/', image: '/projects/resumely.jpg', tags: ['Resume', 'PDF Export'], desc: 'Build a clean, ATS-friendly CV with a live preview and one-click PDF export.' },
    { title: 'A3M Language Club', category: 'EdTech', url: 'https://a3m-language-club.vercel.app/', image: '/projects/a3m-language-club.jpg', tags: ['Education', 'Japanese', 'Chinese'], desc: 'Online platform to learn Japanese and Chinese — JLPT & HSK preparation, live classes and interactive lessons.' },
    { title: 'Nexora Beauty Salon', category: 'Website', url: 'https://nexora-beauty-salon-teal.vercel.app/', image: '/projects/nexora-beauty-salon.jpg', tags: ['Business', 'Beauty'], desc: 'Luxury salon website showcasing bridal styling, skincare, hydra-glow facials and makeup artistry.' },
    { title: 'Nexora Law Firm', category: 'Website', url: 'https://nexora-case-manager.vercel.app/', image: '/projects/nexora-law-firm.jpg', tags: ['Business', 'Legal'], desc: 'Law firm website for corporate litigation, cross-border M&A, intellectual property and trial defense.' },
    { title: 'Doctors Medicin Corner', category: 'E-commerce', url: 'https://doctorsmedicinconner.vercel.app/', image: '/projects/doctors-medicin-corner.jpg', tags: ['Pharmacy', 'Healthcare'], desc: 'Online pharmacy for genuine medicines and healthcare products — search, prescription upload, order tracking and fast delivery.' },
    { title: 'Natural Plate', category: 'E-commerce', url: 'https://natural-platenew.vercel.app/', image: '/projects/natural-plate.jpg', tags: ['Organic', 'Cash on Delivery'], desc: 'Organic food store — fresh vegetables, fruits, grains and eco-friendly areca leaf plates, delivered to your door.' },
    { title: 'Kashor Bidda Niketon', category: 'Website', url: 'https://kashor-bidda-niketon.vercel.app/', image: '/projects/kashor-bidda-niketon.jpg', tags: ['School', 'Bangla'], desc: 'School website (Play group to Class 10) — curriculum, teachers, gallery, notices and admissions, fully in Bangla.' },
  ],

  skills: [
    { group: 'Workflow Automation', items: ['n8n', 'Webhooks', 'REST APIs', 'HTTP Requests', 'Google Sheets', 'SMTP / Email'] },
    { group: 'GoHighLevel CRM', items: ['Pipelines', 'Funnels', 'Forms', 'Calendars', 'Email / SMS Campaigns', 'Snapshots', 'Reputation Management', 'Missed-Call Text Back'] },
    { group: 'Vibe Coding', items: ['Claude Code', 'v0.dev', 'Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Vercel', 'GitHub'] },
    { group: 'AI & Integrations', items: ['OpenAI / ChatGPT', 'Claude AI', 'AI Agents', 'LLM Chains', 'Facebook Graph API', 'SMS & Messenger', 'WooCommerce', 'WordPress'] },
  ],

  testimonials: [
    { quote: 'Abdul turned a repetitive publishing process into a reliable system our team can actually trust.', name: 'Operations Lead', company: 'U.S. E-commerce Brand' },
    { quote: 'The AI customer reply workflow gave us faster response times without losing the personal touch.', name: 'Customer Experience Manager', company: 'U.S. SaaS Company' },
    { quote: 'Clear communication, thoughtful automation, and a smooth handoff.', name: 'Founder', company: 'U.S. Marketing Agency' },
  ],
}
