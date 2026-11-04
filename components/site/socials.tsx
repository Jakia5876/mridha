export function Socials({ socials }: { socials: Record<string, string> }) {
  const items = Object.entries(socials).filter(([, url]) => url)
  if (!items.length) return null
  return (
    <div className="socials">
      {items.map(([name, url]) => (
        <a key={name} href={url} target="_blank" rel="noopener noreferrer">
          {name} ↗
        </a>
      ))}
    </div>
  )
}
