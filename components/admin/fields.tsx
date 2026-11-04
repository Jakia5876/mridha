'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { getBrowserSupabase, MEDIA_BUCKET } from '@/lib/supabase'

export type FieldType = 'text' | 'textarea' | 'tags' | 'image' | 'number' | 'url' | 'file'
export type FieldSpec = { key: string; label: string; type?: FieldType; hint?: string; wide?: boolean }

/* ---------- basic inputs ---------- */

export function TextField({ label, value, onChange, type = 'text', hint, multiline }: {
  label: string; value: string | number | undefined; onChange: (v: string) => void
  type?: string; hint?: string; multiline?: boolean
}) {
  const id = useId()
  return (
    <div className="af">
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea id={id} value={value ?? ''} rows={4} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={id} type={type} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint && <small>{hint}</small>}
    </div>
  )
}

/** Comma-separated list. Keeps the raw text while typing so commas aren't swallowed. */
export function TagsField({ label, value, onChange, hint }: {
  label: string; value: string[] | undefined; onChange: (v: string[]) => void; hint?: string
}) {
  const id = useId()
  const joined = (value || []).join(', ')
  const [raw, setRaw] = useState(joined)
  const focused = useRef(false)
  useEffect(() => { if (!focused.current) setRaw(joined) }, [joined])

  const parse = (s: string) => s.split(',').map((x) => x.trim()).filter(Boolean)
  return (
    <div className="af">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={raw}
        onFocus={() => (focused.current = true)}
        onChange={(e) => { setRaw(e.target.value); onChange(parse(e.target.value)) }}
        onBlur={() => { focused.current = false; setRaw(parse(raw).join(', ')) }}
      />
      <small>{hint || 'কমা (,) দিয়ে আলাদা করুন'}</small>
    </div>
  )
}

/* ---------- uploads ---------- */

async function uploadToStorage(file: File) {
  const safe = file.name.toLowerCase().replace(/[^a-z0-9.\-_]+/g, '-').slice(-80)
  const path = `${new Date().toISOString().slice(0, 10)}/${Date.now()}-${safe}`
  const sb = getBrowserSupabase()
  const { error } = await sb.storage.from(MEDIA_BUCKET).upload(path, file, { cacheControl: '31536000', upsert: false })
  if (error) throw error
  return sb.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl
}

export function UploadField({ label, value, onChange, accept = 'image/*', preview = true, hint }: {
  label: string; value: string | undefined; onChange: (v: string) => void
  accept?: string; preview?: boolean; hint?: string
}) {
  const id = useId()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function onFile(file?: File) {
    if (!file) return
    if (file.size > 10 * 1024 * 1024) return setErr('ফাইল ১০ MB-এর বেশি বড়')
    setBusy(true); setErr('')
    try { onChange(await uploadToStorage(file)) }
    catch (e) { setErr((e as Error).message) }
    finally { setBusy(false) }
  }

  return (
    <div className="af">
      <label htmlFor={id}>{label}</label>
      <div className="af-upload">
        {preview && value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" />
        )}
        <div className="af-upload-col">
          <input id={id} value={value ?? ''} placeholder="https://… বা /ছবি.jpg" onChange={(e) => onChange(e.target.value)} />
          <label className="abtn abtn-ghost">
            {busy ? 'Uploading…' : 'Upload'}
            <input type="file" accept={accept} hidden disabled={busy} onChange={(e) => { onFile(e.target.files?.[0]); e.target.value = '' }} />
          </label>
        </div>
      </div>
      {err && <small className="af-err">{err}</small>}
      {hint && !err && <small>{hint}</small>}
    </div>
  )
}

/* ---------- generic field renderer ---------- */

export function Field({ spec, value, onChange }: {
  spec: FieldSpec; value: unknown; onChange: (v: unknown) => void
}) {
  switch (spec.type) {
    case 'textarea':
      return <TextField label={spec.label} hint={spec.hint} value={value as string} onChange={onChange} multiline />
    case 'tags':
      return <TagsField label={spec.label} hint={spec.hint} value={value as string[]} onChange={onChange} />
    case 'image':
      return <UploadField label={spec.label} hint={spec.hint} value={value as string} onChange={onChange} />
    case 'file':
      return <UploadField label={spec.label} hint={spec.hint} value={value as string} onChange={onChange} accept=".pdf,.doc,.docx" preview={false} />
    case 'number':
      return <TextField label={spec.label} hint={spec.hint} type="number" value={value as number} onChange={(v) => onChange(Number(v) || 0)} />
    case 'url':
      return <TextField label={spec.label} hint={spec.hint} type="url" value={value as string} onChange={onChange} />
    default:
      return <TextField label={spec.label} hint={spec.hint} value={value as string} onChange={onChange} />
  }
}

/* ---------- list editor (add / edit / reorder / delete) ---------- */

export function ListEditor<T extends Record<string, unknown>>({ items, onChange, fields, titleKey, blank, addLabel = 'Add new' }: {
  items: T[]; onChange: (items: T[]) => void; fields: FieldSpec[]
  titleKey: keyof T; blank: T; addLabel?: string
}) {
  const [open, setOpen] = useState<number | null>(null)

  const update = (i: number, key: string, v: unknown) =>
    onChange(items.map((it, j) => (j === i ? { ...it, [key]: v } : it)))
  const move = (i: number, d: number) => {
    const j = i + d
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
    setOpen(open === i ? j : open === j ? i : open)
  }
  const remove = (i: number) => {
    if (!confirm(`"${String(items[i][titleKey] || 'Untitled')}" মুছে ফেলবেন?`)) return
    onChange(items.filter((_, j) => j !== i))
    setOpen(null)
  }
  const add = () => {
    onChange([...items, structuredClone(blank)])
    setOpen(items.length)
  }

  return (
    <div className="alist">
      {items.map((it, i) => (
        <div className={`acard${open === i ? ' open' : ''}`} key={i}>
          <div className="acard-head">
            <button className="acard-title" onClick={() => setOpen(open === i ? null : i)}>
              <span className="acard-num">{String(i + 1).padStart(2, '0')}</span>
              {String(it[titleKey] || 'Untitled')}
              <span className="acard-chev">{open === i ? '−' : '+'}</span>
            </button>
            <div className="acard-tools">
              <button title="Move up" onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
              <button title="Move down" onClick={() => move(i, 1)} disabled={i === items.length - 1}>↓</button>
              <button title="Delete" className="danger" onClick={() => remove(i)}>✕</button>
            </div>
          </div>
          {open === i && (
            <div className="acard-body">
              {fields.map((f) => (
                <div key={f.key} className={f.wide || f.type === 'textarea' || f.type === 'image' ? 'wide' : ''}>
                  <Field spec={f} value={it[f.key]} onChange={(v) => update(i, f.key, v)} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <button className="abtn abtn-ghost alist-add" onClick={add}>+ {addLabel}</button>
    </div>
  )
}
