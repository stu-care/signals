import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentCountry } from '@/lib/useCurrentCountry'
import { buildSearchIndex, search, type SearchKind } from '@/lib/search'
import { SearchIcon } from '@/components/icons'

const KIND_LABEL: Record<SearchKind, string> = {
  aspect: 'Aspect',
  family: 'Signal type',
  safety: 'Safety',
  page: 'Page',
}

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false
  return (
    el.tagName === 'INPUT' ||
    el.tagName === 'TEXTAREA' ||
    el.tagName === 'SELECT' ||
    el.isContentEditable
  )
}

export function Search() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const country = useCurrentCountry()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const index = useMemo(() => buildSearchIndex(country.code), [country.code])
  const results = useMemo(() => search(query, index), [query, index])

  // Press "/" anywhere (outside a field) to open search.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === '/' && !open && !isTypingTarget(e.target)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      triggerRef.current?.focus()
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  const go = (href: string) => {
    setOpen(false)
    navigate(href)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, Math.max(results.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      const r = results[active]
      if (r) go(r.href)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center border border-border bg-surface-2 p-2 text-muted transition hover:border-faint hover:text-ink"
        aria-label="Search"
        title="Search ( / )"
      >
        <SearchIcon className="size-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 flex items-start justify-center bg-bg/70 p-4 pt-[10vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-none border border-border bg-surface shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Search Signals"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search signals, aspects, safety systems…"
              className="w-full border-b border-border bg-transparent px-4 py-3.5 text-base outline-none placeholder:text-faint"
              aria-label="Search query"
              autoComplete="off"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            />

            {query.trim() !== '' && (
              <ul className="max-h-[50vh] overflow-y-auto py-2">
                {results.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm text-muted">
                    No matches for “{query}”.
                  </li>
                )}
                {results.map((r, i) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(r.href)}
                      className={[
                        'flex w-full items-center gap-3 px-4 py-2.5 text-left transition',
                        i === active ? 'bg-surface-2' : 'hover:bg-surface-2',
                      ].join(' ')}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{r.title}</span>
                        <span className="block truncate text-xs text-muted">
                          {r.subtitle}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-none bg-bg px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-faint">
                        {KIND_LABEL[r.kind]}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  )
}
