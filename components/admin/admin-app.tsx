'use client'

import { useCallback, useEffect, useState, type FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { getBrowserSupabase, CONTENT_ID } from '@/lib/supabase'
import { withDefaults } from '@/lib/content'
import type { Portfolio, Profile } from '@/lib/portfolio-data'
import { ListEditor, TagsField, TextField, UploadField, type FieldSpec } from './fields'

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
   MESSAGES
   ========================================================= */

type Msg = { id: string; name: string; email: string; subject: string | null; message: string; is_read: boolean; created_at: string }

function Messages({ onCount }: { onCount: (n: number) => void }) {
  const [msgs, setMsgs] = useState<Msg[] | null>(null)
  const [err, setErr] = useState('')
  const sb = getBrowserSupabase()

  const load = useCallback(async () => {
    const { data, error } = await sb.from('messages').select('*').order('created_at', { ascending: false })
    if (error) return setErr(error.message)
    setMsgs(data as Msg[])
  }, [sb])

  useEffect(() => { load() }, [load])
  useEffect(() => { if (msgs) onCount(msgs.filter((m) => !m.is_read).length) }, [msgs, onCount])

  async function toggleRead(m: Msg) {
    const { error } = await sb.from('messages').update({ is_read: !m.is_read }).eq('id', m.id)
    if (error) return setErr(error.message)
    setMsgs((all) => all?.map((x) => (x.id === m.id ? { ...x, is_read: !x.is_read } : x)) ?? null)
  }
  async function remove(m: Msg) {
    if (!confirm(`${m.name}-এর মেসেজ মুছে ফেলবেন?`)) return
    const { error } = await sb.from('messages').delete().eq('id', m.id)
    if (error) return setErr(error.message)
    setMsgs((all) => all?.filter((x) => x.id !== m.id) ?? null)
  }

  if (err) return <p className="af-err">{err}</p>
  if (!msgs) return <p className="amuted">Loading…</p>
  if (!msgs.length) return <p className="amuted">এখনো কোনো মেসেজ আসেনি। কেউ Contact ফর্ম পূরণ করলে এখানে দেখাবে।</p>

  return (
    <div className="amsgs">
      <button className="abtn abtn-ghost" onClick={load}>↻ Refresh</button>
      {msgs.map((m) => (
        <article key={m.id} className={`amsg${m.is_read ? '' : ' unread'}`}>
          <header>
            <div>
              <strong>{m.name}</strong> <a href={`mailto:${m.email}`}>{m.email}</a>
              <div className="amuted">{new Date(m.created_at).toLocaleString()}</div>
            </div>
            <div className="acard-tools">
              <a className="abtn abtn-ghost" href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + (m.subject || 'your message'))}`}>Reply</a>
              <button onClick={() => toggleRead(m)}>{m.is_read ? 'Mark unread' : 'Mark read'}</button>
              <button className="danger" onClick={() => remove(m)}>✕</button>
            </div>
          </header>
          {m.subject && <h4>{m.subject}</h4>}
          <p>{m.message}</p>
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
  ['profile', 'Profile'],
  ['highlights', 'Hero cards'],
  ['services', 'Services'],
  ['cases', 'Case studies'],
  ['projects', 'Workflows'],
  ['live', 'Live projects'],
  ['skills', 'Skills & tools'],
  ['testimonials', 'Testimonials'],
  ['messages', 'Messages'],
  ['account', 'Account'],
] as const
type Tab = (typeof TABS)[number][0]

function Dashboard({ session }: { session: Session }) {
  const sb = getBrowserSupabase()
  const [tab, setTab] = useState<Tab>('profile')
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
              {id === 'messages' && unread > 0 && <span className="abadge">{unread}</span>}
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
