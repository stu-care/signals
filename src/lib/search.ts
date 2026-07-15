import { getCountryData } from '@/data'

/**
 * Lightweight client-side search. A small index is built from the bundled data
 * (so it works offline), and matching is simple token containment with a little
 * ranking. No external service, no network.
 */

export type SearchKind = 'aspect' | 'family' | 'safety' | 'page'

export interface SearchEntry {
  id: string
  title: string
  subtitle: string
  href: string
  kind: SearchKind
  /** Lowercased haystack of everything we match against. */
  keywords: string
}

export function buildSearchIndex(code: string): SearchEntry[] {
  const data = getCountryData(code)
  if (!data) return []
  const base = `/${code}`
  const entries: SearchEntry[] = []

  for (const family of data.families) {
    entries.push({
      id: `family-${family.id}`,
      title: family.name,
      subtitle: family.blurb,
      href: `${base}/build?f=${family.id}`,
      kind: 'family',
      keywords: `${family.name} ${family.blurb}`.toLowerCase(),
    })

    for (const variant of family.variants) {
      for (const aspect of variant.aspects) {
        entries.push({
          id: `aspect-${family.id}-${variant.id}-${aspect.id}`,
          title: aspect.name,
          subtitle: `${family.name} · ${aspect.meaning}`,
          href: `${base}/aspect/${family.id}/${variant.id}/${aspect.id}`,
          kind: 'aspect',
          keywords:
            `${aspect.name} ${aspect.meaning} ${family.name} ${variant.name}`.toLowerCase(),
        })
      }
    }
  }

  for (const system of data.safetySystems) {
    entries.push({
      id: `safety-${system.id}`,
      title: `${system.abbr} — ${system.name}`,
      subtitle: system.blurb,
      href: `${base}/safety/${system.id}`,
      kind: 'safety',
      keywords: `${system.abbr} ${system.name} ${system.blurb}`.toLowerCase(),
    })
  }

  entries.push(
    {
      id: 'page-about',
      title: 'About & disclaimer',
      subtitle: 'What Signals is, and what it isn’t',
      href: '/about',
      kind: 'page',
      keywords: 'about disclaimer not training help',
    },
    {
      id: 'page-sources',
      title: 'Sources & further reading',
      subtitle: 'References behind the content',
      href: '/sources',
      kind: 'page',
      keywords: 'sources references further reading credits',
    },
  )

  return entries
}

const RANK: Record<SearchKind, number> = { aspect: 0, family: 1, safety: 1, page: 2 }

export function search(query: string, entries: SearchEntry[], limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const tokens = q.split(/\s+/)

  const scored: Array<{ e: SearchEntry; score: number }> = []
  for (const e of entries) {
    if (!tokens.every((t) => e.keywords.includes(t))) continue
    const title = e.title.toLowerCase()
    let score = RANK[e.kind]
    if (title.startsWith(q)) score -= 3
    else if (title.includes(q)) score -= 2
    else if (e.keywords.startsWith(q)) score -= 1
    scored.push({ e, score })
  }

  return scored
    .sort((a, b) => a.score - b.score || a.e.title.localeCompare(b.e.title))
    .slice(0, limit)
    .map((s) => s.e)
}
