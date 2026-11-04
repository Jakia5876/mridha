/* =========================================================
   PORTFOLIO DATA — ওয়েবসাইটের সব কন্টেন্ট এখানে।
   শুধু এই ফাইল এডিট করলেই সাইট আপডেট হয়ে যাবে।
   (নতুন প্রজেক্ট/সার্ভিস যোগ করতে একটা { ... } ব্লক কপি করে নিচে পেস্ট করুন)
   ========================================================= */

window.PORTFOLIO = {
  profile: {
    firstName: "ABDUL",
    lastName: "ALIM",
    fullName: "Abdul Alim Mridha",
    role: "AI Automation & Vibe Coding Specialist",
    heroWord: "AUTOMATOR",
    disciplines: ["n8n Automation", "GoHighLevel CRM", "Vibe Coding"],
    intro:
      "I help businesses save time and grow revenue with n8n workflow automation, GoHighLevel CRM systems, AI chatbots and vibe-coded websites.",
    about:
      "I design automation systems that quietly do the repetitive work — connecting apps, nurturing leads, answering customers and publishing content — so business owners can focus on growth. From n8n workflows and GoHighLevel CRM builds to AI agents and modern websites built with Claude Code and Next.js, every system I deliver is reliable, documented and easy to hand off.",
    photo: "assets/alim.png",
    email: "alim01716779220@gmail.com",
    phone: "+880 1716779220",
    location: "Bangladesh · Working worldwide",
    resume: "", // CV-র লিংক দিন, যেমন "assets/cv.pdf"
    // সোশ্যাল লিংক — খালি ("") থাকলে দেখাবে না
    socials: {
      LinkedIn: "",
      Upwork: "",
      Fiverr: "",
      GitHub: "",
      Facebook: "",
      YouTube: ""
    },
    // ফোন মকআপে দেখানো স্কিল বার
    meters: [
      { label: "n8n Automation", value: 96 },
      { label: "GoHighLevel", value: 92 },
      { label: "Vibe Coding", value: 90 }
    ]
  },

  // হিরো সেকশনের বাম পাশের স্লাইডিং কার্ড
  highlights: [
    { kicker: "Specialist", title: "n8n Automation", caption: "Custom workflows, webhooks & API integrations." },
    { kicker: "Expert", title: "GoHighLevel CRM", caption: "Pipelines, funnels, snapshots & follow-ups." },
    { kicker: "Builder", title: "Vibe Coding", caption: "Next.js websites built with Claude Code & v0." }
  ],

  tools: [
    "n8n", "GoHighLevel", "OpenAI", "Claude AI", "Next.js", "React", "Tailwind CSS",
    "Vercel", "Google Sheets", "WooCommerce", "WordPress", "Facebook Graph API", "Webhooks", "REST APIs"
  ],

  services: [
    { title: "n8n Workflow Automation", desc: "Custom n8n workflows that connect your apps, sync data, and eliminate repetitive manual tasks." },
    { title: "GoHighLevel CRM Setup", desc: "Full GoHighLevel account setup: pipelines, contacts, custom fields, calendars, and snapshots." },
    { title: "GoHighLevel Automation & Funnels", desc: "Lead-nurturing workflows, high-converting funnels, and follow-up sequences that run on autopilot." },
    { title: "Vibe-Coded Websites & Apps", desc: "Modern, fast websites and web apps built with AI-assisted development using Next.js and Vercel." },
    { title: "AI Chatbots & Agents", desc: "AI agents that answer customer questions 24/7 using your own knowledge base." },
    { title: "Email & SMS Automation", desc: "Automated email and SMS campaigns, smart replies, and reliable SMTP delivery setup." },
    { title: "Social Media Automation", desc: "Scheduled, AI-generated posts and images published automatically to your social channels." },
    { title: "Lead Generation & Sales Pipelines", desc: "Capture, qualify, and route leads into your CRM so your sales team never misses an opportunity." },
    { title: "E-commerce Automation", desc: "WooCommerce and WordPress automation for product uploads, multi-store sync, and order workflows." }
  ],

  // বড় করে দেখানো কেস স্টাডি
  caseStudies: [
    {
      title: "AI-Powered Social Media Engine",
      type: "Content Automation",
      image: "assets/workflow-1.jpg",
      tags: ["n8n", "OpenAI", "Facebook Graph API", "Google Sheets"],
      challenge: "Creating consistent, visual Facebook content manually was slow and difficult to scale.",
      approach: "An n8n workflow reads content from Google Sheets, generates copy and imagery with AI, and publishes to Facebook automatically.",
      result: "A repeatable content pipeline that reduces publishing work and keeps every post tracked.",
      link: ""
    },
    {
      title: "Automated Customer Reply Desk",
      type: "AI Support Agent",
      image: "assets/workflow-5.jpg",
      tags: ["n8n", "AI Agent", "Webhooks", "Google Sheets"],
      challenge: "Customer questions needed fast, consistent answers without a full-time support desk.",
      approach: "A webhook receives inbound messages, routes the request through an AI agent and checks a Google Sheets knowledge base before replying.",
      result: "Faster replies with a centralized knowledge source and a workflow that can be extended to new channels.",
      link: ""
    },
    {
      title: "Multi-Store Product Publisher",
      type: "E-commerce Automation",
      image: "assets/workflow-4.jpg",
      tags: ["n8n", "WooCommerce", "WordPress", "HTTP Request"],
      challenge: "Publishing the same product across multiple WordPress stores created repetitive operational work.",
      approach: "A form submission triggers image upload, product creation and follow-up HTTP requests for every store.",
      result: "One submission can coordinate product publishing across several stores with less manual duplication.",
      link: ""
    }
  ],

  // ছোট প্রজেক্ট কার্ড গ্রিড
  projects: [
    { title: "Automatic Facebook Post with AI Image", desc: "Automated daily Facebook posts with AI-generated images using OpenAI and n8n orchestration.", image: "assets/workflow-1.jpg", tags: ["n8n", "OpenAI", "Facebook API"], link: "" },
    { title: "Knowledge Base Email Automation", desc: "AI-powered email responses using OpenAI chat model with Google Sheets integration for CRM.", image: "assets/workflow-2.jpg", tags: ["n8n", "OpenAI", "Email"], link: "" },
    { title: "Auto SMS & Messenger Reply System", desc: "Automated SMS and Messenger replies without code using n8n LLM Chain integration.", image: "assets/workflow-3.jpg", tags: ["n8n", "Webhooks", "LLM Chain"], link: "" },
    { title: "Upload Products to Multiple WordPress Sites", desc: "Automated product upload and sync across multiple WordPress/WooCommerce stores simultaneously.", image: "assets/workflow-4.jpg", tags: ["n8n", "WooCommerce"], link: "" },
    { title: "Auto Reply to Customer from Google Sheet", desc: "Customer inquiry automation with AI agent processing data from Google Sheets with response tracking.", image: "assets/workflow-5.jpg", tags: ["AI Agent", "Google Sheets"], link: "" },
    { title: "Gmail SMTP & cPanel SMTP Setup in n8n", desc: "Complete SMTP email configuration for reliable Gmail and cPanel email delivery in n8n workflows.", image: "assets/workflow-2.jpg", tags: ["n8n", "SMTP"], link: "" }
  ],

  skills: [
    { group: "Workflow Automation", items: ["n8n", "Webhooks", "REST APIs", "HTTP Requests", "Google Sheets", "SMTP / Email"] },
    { group: "GoHighLevel CRM", items: ["Pipelines", "Funnels", "Forms", "Calendars", "Email / SMS Campaigns", "Snapshots", "Reputation Management", "Missed-Call Text Back"] },
    { group: "Vibe Coding", items: ["Claude Code", "v0.dev", "Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel", "GitHub"] },
    { group: "AI & Integrations", items: ["OpenAI / ChatGPT", "Claude AI", "AI Agents", "LLM Chains", "Facebook Graph API", "SMS & Messenger", "WooCommerce", "WordPress"] }
  ],

  testimonials: [
    { quote: "Abdul turned a repetitive publishing process into a reliable system our team can actually trust.", name: "Operations Lead", company: "U.S. E-commerce Brand" },
    { quote: "The AI customer reply workflow gave us faster response times without losing the personal touch.", name: "Customer Experience Manager", company: "U.S. SaaS Company" },
    { quote: "Clear communication, thoughtful automation, and a smooth handoff.", name: "Founder", company: "U.S. Marketing Agency" }
  ]
};
