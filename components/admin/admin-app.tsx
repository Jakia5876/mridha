'use client'

import { useCallback, useEffect, useState, type FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { getBrowserSupabase, CONTENT_ID } from '@/lib/supabase'
import { withDefaults } from '@/lib/content'
import type { Portfolio, Profile, SiteText } from '@/lib/portfolio-data'
import { Field, ListEditor, TagsField, TextField, UploadField, type FieldSpec } from './fields'

/* =========================================================
   LOGIN
   ========================================================= */

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true); setErr('')
    const { error } = await getBrowserSupabase().auth.signInWithPassword({ email: email.trim(), password })
    if (error) setErr(error.message === 'Invalid login credentials' ? 'ইমেইল বা পাসওয়ার্ড ভুল' : error.message)
    setBusy(false)
  }

  return (
    <div className="alogin">
      <form className="alogin-card" onSubmit={submit}>
        <span className="akicker">// admin</span>
        <h1>Portfolio Admin</h1>
        <TextField label="Email" type="email" value={email} onChange={setEmail} />
        <TextField label="Password" type="password" value={password} onChange={setPassword} />
        {err && <p className="af-err">{err}</p>}
        <button className="abtn" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
        <a className="aback" href="/">← Back to site</a>
      </form>
    </div>
  )
}

/* =========================================================
   FIELD DEFINITIONS PER SECTION
   ========================================================= */

const F = {
  bookingEvent: [
    { key: 'title', label: 'Title' },
    { key: 'slug', label: 'Cal.com URL part (e.g. discovery)' },
    { key: 'duration', label: 'Minutes', type: 'number' },
    { key: 'desc', label: 'Description', type: 'textarea' },
  ] as FieldSpec[],
  highlight: [
    { key: 'kicker', label: 'Small text (e.g. Expert)' },
    { key: 'title', label: 'Big title' },
    { key: 'caption', label: 'Caption', wide: true },
  ],
  service: [
    { key: 'title', label: 'Title', wide: true },
    { key: 'desc', label: 'Description', type: 'textarea' },
  ],
  caseStudy: [
    { key: 'title', label: 'Title' },
    { key: 'type', label: 'Type (e.g. Content Automation)' },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'challenge', label: 'Challenge', type: 'textarea' },
    { key: 'approach', label: 'Approach', type: 'textarea' },
    { key: 'result', label: 'Result', type: 'textarea' },
    { key: 'tags', label: 'Tags', type: 'tags' },
    { key: 'link', label: 'Link (optional)', type: 'url' },
  ],
  project: [
    { key: 'title', label: 'Title', wide: true },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'desc', label: 'Description', type: 'textarea' },
    { key: 'tags', label: 'Tags', type: 'tags' },
    { key: 'link', label: 'Link (optional)', type: 'url' },
  ],
  webProject: [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category (SaaS / Website / Web App)' },
    { key: 'url', label: 'Live URL', type: 'url', wide: true },
    { key: 'image', label: 'Screenshot', type: 'image' },
    { key: 'desc', label: 'Description', type: 'textarea' },
    { key: 'tags', label: 'Tags', type: 'tags', wide: true },
  ],
  skill: [
    { key: 'group', label: 'Group name', wide: true },
    { key: 'items', label: 'Skills', type: 'tags', wide: true },
  ],
  testimonial: [
    { key: 'quote', label: 'Quote', type: 'textarea' },
    { key: 'name', label: 'Name / role' },
    { key: 'company', label: 'Company' },
  ],
  meter: [
    { key: 'label', label: 'Label' },
    { key: 'value', label: 'Value (0–100)', type: 'number' },
  ],
} satisfies Record<string, FieldSpec[]>

/* =========================================================
   PROFILE EDITOR
   ========================================================= */

function ProfileEditor({ p, set }: { p: Profile; set: (p: Profile) => void }) {
  const f = (k: keyof Profile) => (v: string) => set({ ...p, [k]: v })
  return (
    <div className="agrid">
      <TextField label="First name (hero, big)" value={p.firstName} onChange={f('firstName')} />
      <TextField label="Last name (hero, outline)" value={p.lastName} onChange={f('lastName')} />
      <TextField label="Full name" value={p.fullName} onChange={f('fullName')} />
      <TextField label="Role / title" value={p.role} onChange={f('role')} />
      <TextField label="Big hero word" value={p.heroWord} onChange={f('heroWord')} />
      <TagsField label="Hero disciplines (top right)" value={p.disciplines} onChange={(v) => set({ ...p, disciplines: v })} />
      <div className="wide"><TextField label="Intro (big text in About)" value={p.intro} onChange={f('intro')} multiline /></div>
      <div className="wide"><TextField label="About paragraph" value={p.about} onChange={f('about')} multiline /></div>
      <div className="wide"><UploadField label="Profile photo" value={p.photo} onChange={f('photo')} hint="বর্গাকার (square) ছবি সবচেয়ে ভালো দেখায়" /></div>
      <TextField label="Email" type="email" value={p.email} onChange={f('email')} />
      <TextField label="Phone" value={p.phone} onChange={f('phone')} />
      <TextField label="Location" value={p.location} onChange={f('location')} />
      <UploadField label="CV / Resume (PDF)" value={p.resume} onChange={f('resume')} accept=".pdf,.doc,.docx" preview={false} hint="খালি রাখলে Download CV বাটন দেখাবে না" />

      <div className="wide">
        <h3 className="asub">Social links <small>খালি রাখলে দেখাবে না</small></h3>
        <div className="agrid">
          {Object.entries(p.socials).map(([name, url]) => (
            <TextField key={name} label={name} type="url" value={url} onChange={(v) => set({ ...p, socials: { ...p.socials, [name]: v } })} />
          ))}
        </div>
      </div>

      <div className="wide">
        <h3 className="asub">Phone skill bars</h3>
        <ListEditor items={p.meters} onChange={(meters) => set({ ...p, meters })} fields={F.meter} titleKey="label" blank={{ label: 'New skill', value: 80 }} addLabel="Add bar" />
      </div>
    </div>
  )
}

/* =========================================================
   PAGE TEXTS (headings, buttons, labels) + SEO
   ========================================================= */

const H = 'নতুন লাইন = লাইন ব্রেক · *তারকার ভেতরের লেখা* = ধূসর/আউটলাইন স্টাইল'

const TEXT_GROUPS: { group: Exclude<keyof SiteText, 'seo' | 'emails'>; title: string; fields: FieldSpec[] }[] = [
  { group: 'nav', title: 'Top menu', fields: [
    { key: 'about', label: 'About link' }, { key: 'services', label: 'Services link' },
    { key: 'work', label: 'Works link' }, { key: 'live', label: 'Live Projects link' },
    { key: 'skills', label: 'Skills link' }, { key: 'testimonials', label: 'Clients link' },
    { key: 'contact', label: 'Contact link' }, { key: 'cta', label: 'Header button' },
  ] },
  { group: 'hero', title: 'Hero (top of page)', fields: [
    { key: 'phoneTagline', label: 'Phone: small tagline under name', hint: '*…* অংশ হালকা দেখাবে' },
    { key: 'status', label: 'Phone: status (green dot)' }, { key: 'scrollHint', label: '"Scroll" hint' },
  ] },
  { group: 'wall', title: 'Workflow banner', fields: [
    { key: 'image', label: 'Banner image', type: 'image' }, { key: 'kicker', label: 'Small text' },
    { key: 'title', label: 'Big text', type: 'textarea', hint: H },
  ] },
  { group: 'about', title: 'About section', fields: [
    { key: 'pill', label: 'Label pill' }, { key: 'heading', label: 'Heading', type: 'textarea', hint: H },
    { key: 'workButton', label: 'Button: See Work' }, { key: 'cvButton', label: 'Button: Download CV' },
    { key: 'statServices', label: 'Stat label 1 (Services)' }, { key: 'statWorkflows', label: 'Stat label 2 (Workflows)' },
    { key: 'statLive', label: 'Stat label 3 (Live websites)' },
  ] },
  { group: 'services', title: 'Services section', fields: [
    { key: 'pill', label: 'Label pill' }, { key: 'heading', label: 'Heading', type: 'textarea', hint: H },
  ] },
  { group: 'work', title: 'Case studies & workflows', fields: [
    { key: 'pill', label: 'Label pill' }, { key: 'heading', label: 'Heading', type: 'textarea', hint: H },
    { key: 'caseLabel', label: '"Case Study" label' }, { key: 'viewButton', label: 'Button: View Project' },
    { key: 'challenge', label: '"Challenge" label' }, { key: 'approach', label: '"Approach" label' },
    { key: 'result', label: '"Result" label' }, { key: 'moreHeading', label: 'Workflows grid heading' },
  ] },
  { group: 'live', title: 'Live projects section', fields: [
    { key: 'pill', label: 'Label pill' }, { key: 'heading', label: 'Heading', type: 'textarea', hint: H },
    { key: 'visitLabel', label: '"Visit site" label' },
  ] },
  { group: 'skills', title: 'Skills section', fields: [
    { key: 'tagline', label: 'Big tagline', type: 'textarea', hint: 'প্রতি লাইন আলাদা লাইনে দেখাবে · *…* = ধূসর' },
  ] },
  { group: 'testimonials', title: 'Testimonials section', fields: [
    { key: 'pill', label: 'Label pill' }, { key: 'heading', label: 'Heading', type: 'textarea', hint: H },
  ] },
  { group: 'contact', title: 'Contact section', fields: [
    { key: 'pill', label: 'Label pill' }, { key: 'heading', label: 'Big heading', type: 'textarea', hint: H },
    { key: 'formTitle', label: 'Form: title' }, { key: 'responseNote', label: 'Form: reply-time note' },
    { key: 'name', label: 'Form: Name label' }, { key: 'email', label: 'Form: Email label' },
    { key: 'phone', label: 'Form: Phone label' }, { key: 'timeline', label: 'Form: Timeline label' },
    { key: 'service', label: 'Form: Service label' }, { key: 'budget', label: 'Form: Budget label' },
    { key: 'details', label: 'Form: Project details label' }, { key: 'selectPlaceholder', label: 'Form: dropdown placeholder' },
    { key: 'detailsPlaceholder', label: 'Form: Project details hint', wide: true },
    { key: 'serviceOptions', label: 'Form: service choices', wide: true, hint: 'কমা (,) দিয়ে আলাদা করুন' },
    { key: 'budgetOptions', label: 'Form: budget choices', wide: true, hint: 'কমা (,) দিয়ে আলাদা করুন · খালি রাখলে Budget লুকাবে' },
    { key: 'timelineOptions', label: 'Form: timeline choices', wide: true, hint: 'কমা (,) দিয়ে আলাদা করুন · খালি রাখলে Timeline লুকাবে' },
    { key: 'button', label: 'Form: send button' }, { key: 'sending', label: 'Form: while sending' },
    { key: 'success', label: 'Form: success message', wide: true },
    { key: 'sendAnother', label: 'Form: "send another" button' }, { key: 'privacyNote', label: 'Form: privacy note', wide: true },
  ] },
  { group: 'book', title: 'Book a Call (Cal.com)', fields: [
    { key: 'navButton', label: 'Header button' }, { key: 'pill', label: 'Label pill' },
    { key: 'heading', label: 'Heading' }, { key: 'button', label: 'Card button' },
    { key: 'sub', label: 'Sub text', wide: true }, { key: 'orMessage', label: '"Or send a message" label' },
  ] },
  { group: 'footer', title: 'Footer', fields: [{ key: 'backToTop', label: '"Back to top" link' }] },
]

function TextsEditor({ t, set }: { t: SiteText; set: (t: SiteText) => void }) {
  const [open, setOpen] = useState<string | null>('nav')
  return (
    <div className="alist">
      <p className="amuted" style={{ marginBottom: 6 }}>
        ডিজাইন একই থাকবে, শুধু লেখা বদলাবে। মেনু লিংকের লেখা খালি রাখলে সেই লিংকটা লুকিয়ে যাবে।
      </p>
      {TEXT_GROUPS.map(({ group, title, fields }) => (
        <div className={`acard${open === group ? ' open' : ''}`} key={group}>
          <div className="acard-head">
            <button className="acard-title" onClick={() => setOpen(open === group ? null : group)}>
              {title}
              <span className="acard-chev">{open === group ? '−' : '+'}</span>
            </button>
          </div>
          {open === group && (
            <div className="acard-body">
              {fields.map((f) => (
                <div key={f.key} className={f.wide || f.type === 'textarea' || f.type === 'image' ? 'wide' : ''}>
                  <Field
                    spec={f}
                    value={(t[group] as Record<string, unknown>)[f.key]}
                    onChange={(v) => set({ ...t, [group]: { ...t[group], [f.key]: v } })}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function EmailsEditor({ e, set }: { e: SiteText['emails']; set: (e: SiteText['emails']) => void }) {
  const f = (k: keyof SiteText['emails']) => (v: string) => set({ ...e, [k]: v })
  const tip = '{name} = যে পাঠিয়েছে তার নাম · {subject} = তার লেখা Subject'
  return (
    <div className="agrid">
      <div className="wide">
        <p className="amuted">
          কেউ Contact ফর্ম সাবমিট করলে: মেসেজটা এখানে <strong>Messages</strong>-এ সেভ হয়, আপনার কাছে একটা নোটিফিকেশন মেইল যায়
          (সেখানে Reply চাপলেই সরাসরি তাকে উত্তর যাবে), আর যে পাঠিয়েছে তার কাছে একটা কনফার্মেশন মেইল যায়।
        </p>
      </div>
      <h3 className="asub wide">আপনার কাছে আসা নোটিফিকেশন</h3>
      <TextField label="Notification email (কোন মেইলে আসবে)" type="email" value={e.notifyTo} onChange={f('notifyTo')} />
      <TextField label="Sender name (মেইলে যে নাম দেখাবে)" value={e.fromName} onChange={f('fromName')} />
      <div className="wide"><TextField label="Notification subject" value={e.notifySubject} onChange={f('notifySubject')} hint={tip} /></div>

      <h3 className="asub wide">যে ফর্ম পূরণ করেছে, তার কাছে কনফার্মেশন</h3>
      <div className="wide"><TextField label="Subject" value={e.confirmSubject} onChange={f('confirmSubject')} hint={tip} /></div>
      <div className="wide"><TextField label="Heading" value={e.confirmHeading} onChange={f('confirmHeading')} hint={tip} /></div>
      <div className="wide"><TextField label="Message" value={e.confirmBody} onChange={f('confirmBody')} multiline hint={tip} /></div>
      <div className="wide"><TextField label="Signature" value={e.signature} onChange={f('signature')} multiline /></div>
    </div>
  )
}

function SeoEditor({ seo, set }: { seo: SiteText['seo']; set: (s: SiteText['seo']) => void }) {
  return (
    <div className="agrid">
      <div className="wide">
        <TextField label="Page title (Google / browser tab)" value={seo.title} onChange={(v) => set({ ...seo, title: v })}
          hint={`${seo.title.length} অক্ষর · ৫০–৭০ অক্ষর ভালো`} />
      </div>
      <div className="wide">
        <TextField label="Description (Google-এ টাইটেলের নিচে)" value={seo.description} onChange={(v) => set({ ...seo, description: v })}
          multiline hint={`${seo.description.length} অক্ষর · ১২০–১৬০ অক্ষর ভালো`} />
      </div>
      <div className="wide"><TagsField label="Keywords" value={seo.keywords} onChange={(v) => set({ ...seo, keywords: v })} /></div>
      <div className="wide">
        <UploadField label="Share image (Facebook / WhatsApp / LinkedIn preview)" value={seo.shareImage} onChange={(v) => set({ ...seo, shareImage: v })}
          hint="১২০০×৬৩০ সাইজ সবচেয়ে ভালো · খালি রাখলে প্রোফাইল ছবি" />
      </div>
    </div>
  )
}

/* =========================================================
   MESSAGES
   ========================================================= */

type Msg = { id: string; name: string; email: string; subject: string | null; message: string; is_read: boolean; created_at: string
  notify_status?: string | null; confirm_status?: string | null }

/** "✓ Emailed to you" style chip. Hover shows the exact reason if it failed. */
function MailChip({ ok: label, fail, s }: { ok: string; fail: string; s?: string | null }) {
  if (!s) return <span className="achip" title="এই মেসেজটা ইমেইল সিস্টেম চালুর আগের">— {label}</span>
  const ok = s === 'sent'
  return <span className={`achip ${ok ? 'ok' : 'bad'}`} title={s}>{ok ? '✓' : '✕'} {ok ? label : fail}</span>
}

function timeAgo(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)} min ago`
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`
  return new Date(iso).toLocaleString()
}

function Messages({ onCount }: { onCount: (n: number) => void }) {
  const [msgs, setMsgs] = useState<Msg[] | null>(null)
  const [err, setErr] = useState('')
  const [filter, setFilter] = useState<'all' | 'new'>('all')
  const sb = getBrowserSupabase()

  const load = useCallback(async () => {
    const { data, error } = await sb.from('messages').select('*').order('created_at', { ascending: false })
    if (error) return setErr(error.message)
    setErr('')
    setMsgs(data as Msg[])
  }, [sb])

  // new messages show up by themselves: every 20 s and whenever you come back to the tab
  useEffect(() => {
    load()
    const t = setInterval(load, 20_000)
    const onFocus = () => load()
    window.addEventListener('focus', onFocus)
    return () => { clearInterval(t); window.removeEventListener('focus', onFocus) }
  }, [load])
  useEffect(() => { if (msgs) onCount(msgs.filter((m) => !m.is_read).length) }, [msgs, onCount])

  async function setRead(m: Msg, is_read: boolean) {
    if (m.is_read === is_read) return
    setMsgs((all) => all?.map((x) => (x.id === m.id ? { ...x, is_read } : x)) ?? null)
    const { error } = await sb.from('messages').update({ is_read }).eq('id', m.id)
    if (error) setErr(error.message)
  }
  async function remove(m: Msg) {
    if (!confirm(`${m.name}-এর মেসেজ মুছে ফেলবেন?`)) return
    const { error } = await sb.from('messages').delete().eq('id', m.id)
    if (error) return setErr(error.message)
    setMsgs((all) => all?.filter((x) => x.id !== m.id) ?? null)
  }

  if (!msgs) return err ? <p className="af-err">{err}</p> : <p className="amuted">Loading…</p>
  const unread = msgs.filter((m) => !m.is_read).length
  const shown = filter === 'new' ? msgs.filter((m) => !m.is_read) : msgs

  return (
    <div className="amsgs">
      <div className="amsgs-bar">
        <p className="amuted">Everything people send through the contact form on your site.</p>
        <div className="amsgs-filter">
          <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All ({msgs.length})</button>
          <button className={filter === 'new' ? 'on' : ''} onClick={() => setFilter('new')}>New ({unread})</button>
          <button onClick={load} title="Refresh">↻</button>
        </div>
      </div>
      {err && <p className="af-err">{err}</p>}
      {!shown.length && (
        <div className="amsg empty">
          <p className="amuted">{msgs.length ? 'কোনো নতুন মেসেজ নেই 🎉' : 'এখনো কোনো মেসেজ আসেনি। কেউ Contact ফর্ম পূরণ করলে এখানে নিজে থেকেই দেখাবে।'}</p>
        </div>
      )}
      {shown.map((m) => (
        <article key={m.id} className={`amsg${m.is_read ? '' : ' unread'}`} onClick={() => setRead(m, true)}>
          <header>
            <div>
              {!m.is_read && <span className="anew">NEW</span>}
              <strong>{m.name}</strong> <a href={`mailto:${m.email}`} onClick={(e) => e.stopPropagation()}>{m.email}</a>
            </div>
            <span className="amuted amsg-time" title={new Date(m.created_at).toLocaleString()}>{timeAgo(m.created_at)}</span>
          </header>
          {m.subject && <div className="amsg-meta">Subject: {m.subject}</div>}
          <p>{m.message}</p>
          <footer>
            <div className="achips">
              <MailChip ok="Emailed to you" fail="Email to you failed" s={m.notify_status} />
              <MailChip ok="Confirmation sent" fail="Confirmation failed" s={m.confirm_status} />
            </div>
            <div className="acard-tools" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setRead(m, !m.is_read)}>{m.is_read ? 'Mark unread' : 'Mark read'}</button>
              <button className="danger" title="Delete" onClick={() => remove(m)}>✕</button>
              <a className="abtn abtn-ghost asm" href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + (m.subject || 'your message'))}`} onClick={() => setRead(m, true)}>Reply ↗</a>
            </div>
          </footer>
        </article>
      ))}
    </div>
  )
}

/* =========================================================
   ACCOUNT
   ========================================================= */

function Account({ email }: { email: string }) {
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [msg, setMsg] = useState('')

  async function change(e: FormEvent) {
    e.preventDefault()
    if (pw.length < 8) return setMsg('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে')
    if (pw !== pw2) return setMsg('দুটো পাসওয়ার্ড মিলছে না')
    const { error } = await getBrowserSupabase().auth.updateUser({ password: pw })
    setMsg(error ? error.message : '✓ পাসওয়ার্ড বদলানো হয়েছে')
    if (!error) { setPw(''); setPw2('') }
  }

  return (
    <form className="agrid" onSubmit={change}>
      <div className="wide"><p className="amuted">Logged in as <strong>{email}</strong></p></div>
      <TextField label="New password" type="password" value={pw} onChange={setPw} />
      <TextField label="Repeat new password" type="password" value={pw2} onChange={setPw2} />
      <div className="wide">
        {msg && <p className="amuted">{msg}</p>}
        <button className="abtn">Change password</button>
      </div>
    </form>
  )
}

/* =========================================================
   DASHBOARD
   ========================================================= */

const TABS = [
  ['messages', 'Messages'],
  ['profile', 'Profile'],
  ['texts', 'Page texts'],
  ['highlights', 'Hero cards'],
  ['services', 'Services'],
  ['cases', 'Case studies'],
  ['projects', 'Workflows'],
  ['live', 'Live projects'],
  ['booking', 'Booking (Cal.com)'],
  ['skills', 'Skills & tools'],
  ['testimonials', 'Testimonials'],
  ['emails', 'Emails'],
  ['seo', 'SEO'],
  ['account', 'Account'],
] as const
type Tab = (typeof TABS)[number][0]

function Dashboard({ session }: { session: Session }) {
  const sb = getBrowserSupabase()
  const [tab, setTab] = useState<Tab>('messages')
  const [data, setData] = useState<Portfolio | null>(null)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [note, setNote] = useState('')
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    ;(async () => {
      const { data: ok } = await sb.rpc('is_admin')
      setIsAdmin(ok === true)
      const { data: row, error } = await sb.from('site_content').select('data').eq('id', CONTENT_ID).maybeSingle()
      if (error) setNote('Load error: ' + error.message)
      setData(withDefaults(row?.data))
      const { count } = await sb.from('messages').select('id', { count: 'exact', head: true }).eq('is_read', false)
      setUnread(count || 0)
    })()
  }, [sb])

  // keep the "N new" badge fresh while working in other tabs
  useEffect(() => {
    const t = setInterval(async () => {
      const { count } = await sb.from('messages').select('id', { count: 'exact', head: true }).eq('is_read', false)
      if (typeof count === 'number') setUnread(count)
    }, 30_000)
    return () => clearInterval(t)
  }, [sb])

  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const set = <K extends keyof Portfolio>(k: K, v: Portfolio[K]) => {
    setData((d) => (d ? { ...d, [k]: v } : d))
    setDirty(true)
    setNote('')
  }

  async function save() {
    if (!data) return
    setSaving(true); setNote('')
    const { error } = await sb.from('site_content').upsert({ id: CONTENT_ID, data, updated_at: new Date().toISOString() })
    if (error) { setSaving(false); return setNote('✕ Save failed: ' + error.message) }
    const res = await fetch('/api/revalidate', { method: 'POST', headers: { Authorization: `Bearer ${session.access_token}` } })
    setSaving(false)
    setDirty(false)
    setNote(res.ok ? '✓ Saved — সাইট আপডেট হয়ে গেছে' : '✓ Saved — সাইটে দেখাতে ৫ মিনিট পর্যন্ত লাগতে পারে')
  }

  const onCount = useCallback((n: number) => setUnread(n), [])

  if (isAdmin === false)
    return (
      <div className="alogin"><div className="alogin-card">
        <h1>No access</h1>
        <p className="amuted">{session.user.email} অ্যাকাউন্টটা admin নয়।</p>
        <button className="abtn" onClick={() => sb.auth.signOut()}>Sign out</button>
      </div></div>
    )
  if (!data) return <div className="alogin"><p className="amuted">Loading…</p></div>

  return (
    <div className="admin">
      <aside className="aside">
        <div className="abrand"><span className="akicker">// admin</span>{data.profile.fullName}</div>
        <nav>
          {TABS.map(([id, label]) => (
            <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>
              {label}
              {id === 'messages' && unread > 0 && <span className="abadge">{unread} new</span>}
            </button>
          ))}
        </nav>
        <div className="aside-foot">
          <a href="/" target="_blank" rel="noopener">View site ↗</a>
          <button onClick={() => { if (!dirty || confirm('সেভ না করা পরিবর্তন হারিয়ে যাবে। Sign out করবেন?')) sb.auth.signOut() }}>Sign out</button>
        </div>
      </aside>

      <main className="amain">
        <header className="atop">
          <h2>{TABS.find(([id]) => id === tab)?.[1]}</h2>
          {tab !== 'messages' && tab !== 'account' && (
            <div className="asave">
              {note && <span className={note.startsWith('✕') ? 'af-err' : 'amuted'}>{note}</span>}
              {dirty && !note && <span className="amuted">Unsaved changes</span>}
              <button className="abtn" onClick={save} disabled={!dirty || saving}>{saving ? 'Saving…' : 'Save changes'}</button>
            </div>
          )}
        </header>

        {tab === 'profile' && <ProfileEditor p={data.profile} set={(p) => set('profile', p)} />}
        {tab === 'texts' && <TextsEditor t={data.site} set={(v) => set('site', v)} />}
        {tab === 'emails' && <EmailsEditor e={data.site.emails} set={(emails) => set('site', { ...data.site, emails })} />}
        {tab === 'seo' && <SeoEditor seo={data.site.seo} set={(seo) => set('site', { ...data.site, seo })} />}
        {tab === 'highlights' && (
          <ListEditor items={data.highlights} onChange={(v) => set('highlights', v)} fields={F.highlight} titleKey="title" blank={{ kicker: 'Expert', title: 'New card', caption: '' }} addLabel="Add card" />
        )}
        {tab === 'services' && (
          <ListEditor items={data.services} onChange={(v) => set('services', v)} fields={F.service} titleKey="title" blank={{ title: 'New service', desc: '' }} addLabel="Add service" />
        )}
        {tab === 'cases' && (
          <ListEditor items={data.caseStudies} onChange={(v) => set('caseStudies', v)} fields={F.caseStudy} titleKey="title"
            blank={{ title: 'New case study', type: '', image: '', tags: [], challenge: '', approach: '', result: '', link: '' }} addLabel="Add case study" />
        )}
        {tab === 'projects' && (
          <ListEditor items={data.projects} onChange={(v) => set('projects', v)} fields={F.project} titleKey="title"
            blank={{ title: 'New project', desc: '', image: '', tags: [], link: '' }} addLabel="Add project" />
        )}
        {tab === 'live' && (
          <>
            <p className="amuted" style={{ marginBottom: 14 }}>↑↓ দিয়ে ক্রম বদলান। কোনো একটা প্রজেক্ট বড় করে দেখাতে নিচে &quot;Featured&quot; থেকে বেছে নিন।</p>
            <ListEditor items={data.webProjects} onChange={(v) => set('webProjects', v)} fields={F.webProject} titleKey="title"
              blank={{ title: 'New website', category: 'Website', desc: '', url: 'https://', image: '', tags: [], featured: false }} addLabel="Add live project" />
            <div className="af" style={{ marginTop: 18 }}>
              <label>Featured (big card)</label>
              <select
                value={data.webProjects.findIndex((w) => w.featured)}
                onChange={(e) => {
                  const k = Number(e.target.value)
                  set('webProjects', data.webProjects.map((w, i) => ({ ...w, featured: i === k })))
                }}
              >
                <option value={-1}>— None —</option>
                {data.webProjects.map((w, i) => <option key={i} value={i}>{w.title}</option>)}
              </select>
            </div>
          </>
        )}
        {tab === 'booking' && (
          <>
            <p className="amuted" style={{ marginBottom: 14 }}>
              Cal.com-এর মিটিং টাইপগুলো এখানে দিন। URL part = cal.com/username/<b>এই অংশ</b>। সব মুছে দিলে Book a Call অংশ লুকিয়ে যাবে।
            </p>
            <TextField label="Cal.com username" value={data.booking.calUser} hint="cal.com/ এর পরের অংশ, যেমন abdulalimmridha"
              onChange={(v) => set('booking', { ...data.booking, calUser: v.trim() })} />
            <h3 className="asub">Meeting types</h3>
            <ListEditor items={data.booking.events} onChange={(v) => set('booking', { ...data.booking, events: v })} fields={F.bookingEvent} titleKey="title"
              blank={{ title: 'New meeting', slug: '', duration: 30, desc: '' }} addLabel="Add meeting type" />
          </>
        )}
        {tab === 'skills' && (
          <>
            <TagsField label="Tools (scrolling strip)" value={data.tools} onChange={(v) => set('tools', v)} />
            <h3 className="asub">Skill groups</h3>
            <ListEditor items={data.skills} onChange={(v) => set('skills', v)} fields={F.skill} titleKey="group" blank={{ group: 'New group', items: [] }} addLabel="Add group" />
          </>
        )}
        {tab === 'testimonials' && (
          <ListEditor items={data.testimonials} onChange={(v) => set('testimonials', v)} fields={F.testimonial} titleKey="name" blank={{ quote: '', name: 'Client', company: '' }} addLabel="Add testimonial" />
        )}
        {tab === 'messages' && <Messages onCount={onCount} />}
        {tab === 'account' && <Account email={session.user.email || ''} />}
      </main>
    </div>
  )
}

/* =========================================================
   ROOT
   ========================================================= */

export function AdminApp() {
  const [session, setSession] = useState<Session | null | undefined>(undefined)

  useEffect(() => {
    const sb = getBrowserSupabase()
    sb.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (session === undefined) return <div className="alogin"><p className="amuted">Loading…</p></div>
  return session ? <Dashboard session={session} /> : <Login />
}
