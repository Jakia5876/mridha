import { Fragment } from 'react'

/**
 * Renders admin-edited heading text without allowing HTML:
 *   new line      → <br />  (or one <span> per line with `lines`)
 *   *some words*  → styled part (grey "muted" by default)
 */
function Inline({ text, emClass, emTag }: { text: string; emClass?: string; emTag: 'span' | 'em' }) {
  const Em = emTag
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.length > 2 && part.startsWith('*') && part.endsWith('*') ? (
          <Em key={i} className={emClass}>{part.slice(1, -1)}</Em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

export function Rich({ text, emClass = 'muted', emTag = 'span', lines = false }: {
  text: string; emClass?: string; emTag?: 'span' | 'em'; lines?: boolean
}) {
  const rows = (text || '').split(/\r?\n/)
  if (lines) return <>{rows.map((r, i) => <span key={i}><Inline text={r} emClass={emClass} emTag={emTag} /></span>)}</>
  return (
    <>
      {rows.map((r, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <Inline text={r} emClass={emClass} emTag={emTag} />
        </Fragment>
      ))}
    </>
  )
}

/** Plain text version (for SEO / aria labels). */
export const plain = (text: string) => (text || '').replace(/\*/g, '').replace(/\s*\n\s*/g, ' ').trim()
