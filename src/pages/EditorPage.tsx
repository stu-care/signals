import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import type {
  ArmPanel,
  Aspect,
  Backplate,
  DotState,
  FeatherPanel,
  GlyphPanel,
  JunctionPanel,
  LampColour,
  LampSlot,
  Panel,
  PosLightPanel,
  SharedLampPanel,
  SignalFamily,
  SignalVariant,
} from '@/data/types'
import { SignalRenderer } from '@/components/signal/SignalRenderer'
import { migrateBackplates, roundedPolyPath } from '@/lib/shape'
import { ArrowRightIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@/components/icons'
import {
  listFamilies,
  loadFamily,
  loadLampPanels,
  saveFamily,
  saveLampPanels,
} from '@/lib/editor-api'
import { getAllConceptOptions, resolveLampsRefs } from '@/data'
import { COUNTRIES } from '@/data/countries'

/** The editable body of a lamp panel — shared by inline and shared-def editing. */
type LampBody = { id: string; w: number; h: number; lamps: LampSlot[]; backplates?: Backplate[] }

/** Fold any legacy singular `backplate` on a family's lamps panels + shared defs. */
function migrateFamilyBackplates(f: SignalFamily): void {
  for (const v of f.variants) for (const p of v.panels) if (p.type === 'lamps') migrateBackplates(p)
}
const COLORS: LampColour[] = ['red', 'amber', 'yellow', 'green', 'white', 'lunar', 'blue']
const DOT_FILL: Record<LampColour, string> = {
  red: '#e5372b', amber: '#ef8b1b', yellow: '#f1c015', green: '#1fa85a',
  white: '#c9d3ea', lunar: '#b9c6e8', blue: '#2f6fed',
}
const CANVAS_SCALE = 2.6

const uid = (p: string) => `${p}-${Math.random().toString(36).slice(2, 7)}`
const clone = <T,>(x: T): T => structuredClone(x)

export function EditorPage() {
  if (!import.meta.env.DEV) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <h1 className="text-2xl font-bold">Editor is local-only</h1>
        <p className="mt-3 text-muted">
          The signal editor writes to files on disk, so it only runs under{' '}
          <code className="font-mono">npm run dev</code>.
        </p>
      </div>
    )
  }
  return <Editor />
}

function Editor() {
  const [country, setCountry] = useState('uk')
  const [ids, setIds] = useState<string[]>([])
  const [familyId, setFamilyId] = useState<string | null>(null)
  const [family, setFamily] = useState<SignalFamily | null>(null)
  const [vi, setVi] = useState(0)
  const [tab, setTab] = useState<'structure' | 'aspects'>('structure')
  const [selPanel, setSelPanel] = useState<string | null>(null)
  const [selDot, setSelDot] = useState<string | null>(null)
  const [selAspect, setSelAspect] = useState(0)
  const [showMeta, setShowMeta] = useState(false)
  const [status, setStatus] = useState('')
  const [newId, setNewId] = useState('')
  const [newName, setNewName] = useState('')
  const [sharedPanels, setSharedPanels] = useState<SharedLampPanel[]>([])
  const [sharedDirty, setSharedDirty] = useState(false)

  const refresh = (c: string) => listFamilies(c).then(setIds).catch((e) => setStatus(String(e)))
  useEffect(() => {
    refresh(country)
    loadLampPanels(country)
      .then((list) => { list.forEach(migrateBackplates); setSharedPanels(list) })
      .catch(() => setSharedPanels([]))
    setSharedDirty(false)
  }, [country])

  useEffect(() => {
    if (!familyId) {
      setFamily(null)
      return
    }
    loadFamily(country, familyId)
      .then((f) => {
        migrateFamilyBackplates(f)
        setFamily(f)
        setVi(0)
        setSelPanel(f.variants[0]?.panels[0]?.id ?? null)
        setSelDot(null)
        setSelAspect(0)
        setStatus('')
      })
      .catch((e) => setStatus(String(e)))
  }, [familyId, country])

  // Existing concepts (saved, across all countries) + this family's unsaved ones,
  // so the aspect "concept" field can offer a pick-list instead of blind typing.
  const conceptOptions = useMemo(() => {
    const map = new Map<string, string>()
    for (const o of getAllConceptOptions()) map.set(o.concept, o.sample)
    family?.variants.forEach((v) =>
      v.aspects.forEach((a) => { if (a.concept && !map.has(a.concept)) map.set(a.concept, a.name || '') }),
    )
    return [...map.entries()]
      .map(([concept, sample]) => ({ concept, sample }))
      .sort((a, b) => a.concept.localeCompare(b.concept))
  }, [family])

  // ---- chooser (no family selected) ----
  if (!familyId) {
    const createFamily = async () => {
      const id = newId.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '')
      if (!id) return setStatus('enter an id (letters, numbers, hyphens)')
      const fam: SignalFamily = {
        id,
        name: newName.trim() || id,
        blurb: '',
        intro: '',
        order: 100,
        variants: [{ id: 'main', name: 'Main', blurb: '', panels: [], aspects: [] }],
      }
      try {
        await saveFamily(country, fam)
        setNewId('')
        setNewName('')
        await refresh(country)
        setFamilyId(id)
      } catch (e) {
        setStatus(String(e))
      }
    }
    return (
      <div>
        <Header status={status}>
          <select value={country} onChange={(e) => { setCountry(e.target.value); setFamilyId(null) }} className={select()}>
            {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
        </Header>
        <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-widest text-muted">
          Families in {country}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {ids.length === 0 && <span className="text-sm text-muted">none yet</span>}
          {ids.map((id) => (
            <button key={id} onClick={() => setFamilyId(id)} className={chip(false)}>{id}</button>
          ))}
        </div>
        <div className="mt-6 max-w-md border border-border bg-surface p-4">
          <p className={label()}>New family</p>
          <div className="mt-2 space-y-2 text-sm">
            <TextRow label="id" value={newId} onChange={setNewId} />
            <TextRow label="name" value={newName} onChange={setNewName} />
            <button onClick={createFamily} className="mt-1 w-full bg-accent px-3 py-2 text-sm font-semibold text-white hover:bg-accent-hover">
              Create in {country}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!family) {
    return <div><Header status={status || 'loading…'} /></div>
  }

  const variant = (family.variants[vi] ?? family.variants[0])!
  const mutate = (fn: (f: SignalFamily) => void) => {
    const next = clone(family)
    fn(next)
    setFamily(next)
    setStatus('unsaved changes')
  }
  const mutVariant = (fn: (v: SignalVariant) => void) => mutate((f) => fn(f.variants[vi]))
  const mutShared = (fn: (list: SharedLampPanel[]) => void) => {
    const next = clone(sharedPanels)
    fn(next)
    setSharedPanels(next)
    setSharedDirty(true)
    setStatus('unsaved changes')
  }

  const addVariant = () => {
    const nv = { id: uid('variant'), name: 'New variant', blurb: '', panels: [], aspects: [] }
    const idx = family.variants.length
    mutate((f) => f.variants.push(nv))
    setVi(idx)
    setSelPanel(null)
    setSelDot(null)
    setSelAspect(0)
  }

  const save = async () => {
    setStatus('saving…')
    try {
      await saveFamily(country, family)
      if (sharedDirty) {
        await saveLampPanels(country, sharedPanels)
        setSharedDirty(false)
      }
      await refresh(country)
      setStatus('saved — reload the app to see it live')
    } catch (e) {
      setStatus(String(e))
    }
  }

  const resolvedPanels = resolveLampsRefs(variant.panels, sharedPanels)
  const aspect = variant.aspects[selAspect]
  const aspectState = aspect
    ? { lamps: aspect.lamps, arms: aspect.arms, on: aspect.on, feathers: aspect.feathers, glyphs: aspect.glyphs }
    : undefined

  return (
    <div>
      <Header status={status}>
        <button onClick={() => setFamilyId(null)} className={`inline-flex items-center gap-1 ${chip(false)}`}><ArrowRightIcon className="size-3.5 rotate-180" />families</button>
        <span className="font-mono text-xs text-faint">{country}</span>
        <select value={vi} onChange={(e) => { setVi(+e.target.value); setSelPanel(family.variants[+e.target.value].panels[0]?.id ?? null); setSelDot(null); setSelAspect(0) }} className={select()}>
          {family.variants.map((v, i) => <option key={v.id} value={i}>{v.shortName ?? v.name}</option>)}
        </select>
        <button onClick={addVariant} className={chip(false)}>+ variant</button>
        <button onClick={() => setShowMeta((m) => !m)} className={chip(showMeta)}>Settings</button>
        <button onClick={save} className="bg-accent px-4 py-1.5 text-sm font-semibold text-white hover:bg-accent-hover">
          Save to disk
        </button>
      </Header>

      {showMeta && variant && (
        <div className="mt-4 grid gap-3 border border-border bg-surface p-4 text-sm sm:grid-cols-2">
          <div className="space-y-2">
            <p className={label()}>Family</p>
            <TextRow label="name" value={family.name} onChange={(s) => mutate((f) => { f.name = s })} />
            <TextRow label="blurb" value={family.blurb} onChange={(s) => mutate((f) => { f.blurb = s })} />
            <TextRow label="intro" value={family.intro} onChange={(s) => mutate((f) => { f.intro = s })} />
            <NumRow label="order" value={family.order ?? 100} onChange={(n) => mutate((f) => { f.order = n })} />
          </div>
          <div className="space-y-2">
            <p className={label()}>Variant</p>
            <TextRow label="name" value={variant.name} onChange={(s) => mutVariant((v) => { v.name = s })} />
            <TextRow label="short" value={variant.shortName ?? ''} onChange={(s) => mutVariant((v) => { v.shortName = s || undefined })} />
            <TextRow label="blurb" value={variant.blurb} onChange={(s) => mutVariant((v) => { v.blurb = s })} />
            {family.variants.length > 1 && (
              <button onClick={() => { mutate((f) => f.variants.splice(vi, 1)); setVi(0) }} className="text-xs text-sig-red">Delete variant</button>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Preview */}
        <div>
          <div className="flex min-h-[220px] items-center justify-center rounded-none border border-border bg-surface p-6">
            <SignalRenderer panels={resolvedPanels} state={aspectState} scale={1.8} showInactive={tab === 'structure'} />
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={() => setTab('structure')} className={tabBtn(tab === 'structure')}>Structure</button>
            <button onClick={() => setTab('aspects')} className={tabBtn(tab === 'aspects')}>Aspects</button>
          </div>
        </div>

        {/* Editor */}
        <div>
          {tab === 'structure' ? (
            <StructureEditor
              variant={variant}
              selPanel={selPanel}
              setSelPanel={setSelPanel}
              selDot={selDot}
              setSelDot={setSelDot}
              mutVariant={mutVariant}
              sharedPanels={sharedPanels}
              mutShared={mutShared}
            />
          ) : (
            <AspectEditor
              variant={{ ...variant, panels: resolvedPanels }}
              selAspect={selAspect}
              setSelAspect={setSelAspect}
              mutVariant={mutVariant}
              conceptOptions={conceptOptions}
            />
          )}
        </div>
      </div>
    </div>
  )
}

/* ---- Structure editor -------------------------------------------- */

function StructureEditor({
  variant, selPanel, setSelPanel, selDot, setSelDot, mutVariant, sharedPanels, mutShared,
}: {
  variant: SignalVariant
  selPanel: string | null
  setSelPanel: (id: string | null) => void
  selDot: string | null
  setSelDot: (id: string | null) => void
  mutVariant: (fn: (v: SignalVariant) => void) => void
  sharedPanels: SharedLampPanel[]
  mutShared: (fn: (list: SharedLampPanel[]) => void) => void
}) {
  const panel = variant.panels.find((p) => p.id === selPanel) ?? null
  const [showLib, setShowLib] = useState(false)

  const addPanel = (type: Panel['type']) => {
    const id = uid(type)
    let np: Panel
    if (type === 'lamps') np = { type, id, w: 30, h: 120, lamps: [] }
    else if (type === 'lamps-ref') return // linked via the lamp library, not this row
    else if (type === 'arm') np = { type, id, kind: 'stop', label: 'Arm' }
    else if (type === 'poslight') np = { type, id, dir: 'ur', r: 7, label: 'Position light' }
    else if (type === 'feather') np = { type, id, dir: 'ur', r: 5, label: 'Feather' }
    else if (type === 'junction') np = { type, id, positions: [1, 2, 3, 4, 5, 6], r: 5, label: 'Junction indicator' }
    else if (type === 'glyph') np = { type, id, size: 24, label: 'Glyph' }
    else np = { type: 'sign', id, kind: 'psr', primary: '40', size: 34, label: 'Sign' }
    mutVariant((v) => v.panels.push(np))
    setSelPanel(id)
    setSelDot(null)
  }

  const addRef = (ref: string) => {
    const id = uid('lamps')
    mutVariant((v) => v.panels.push({ type: 'lamps-ref', id, ref }))
    setSelPanel(id)
    setSelDot(null)
    setShowLib(false)
  }
  const newSharedPanel = () => {
    const ref = uid('lamp')
    mutShared((list) => list.push({ id: ref, name: 'New lamp panel', w: 30, h: 120, lamps: [] }))
    addRef(ref)
  }
  const makeShared = (panelId: string) => {
    const inline = variant.panels.find((p) => p.id === panelId)
    if (inline?.type !== 'lamps') return
    const ref = uid('lamp')
    mutShared((list) => list.push({ id: ref, name: 'Lamp panel', w: inline.w, h: inline.h, lamps: clone(inline.lamps), ...(inline.backplates?.length ? { backplates: clone(inline.backplates) } : {}) }))
    mutVariant((v) => { const idx = v.panels.findIndex((p) => p.id === panelId); if (idx >= 0) v.panels[idx] = { type: 'lamps-ref', id: panelId, ref } })
    setSelDot(null)
  }

  const panelName = (p: Panel) =>
    p.type === 'lamps-ref'
      ? `lamps · ${sharedPanels.find((s) => s.id === p.ref)?.name ?? '⚠ missing'}`
      : `${p.type}${'label' in p && p.label ? ` · ${p.label}` : ''}`

  return (
    <div className="space-y-4">
      <div className="rounded-none border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <p className={label()}>Panels (top → bottom)</p>
          <div className="flex flex-wrap gap-1">
            {(['lamps', 'arm', 'feather', 'junction', 'poslight', 'glyph', 'sign'] as const).map((t) => (
              <button key={t} onClick={() => addPanel(t)} className="rounded-none border border-border px-2 py-1 text-xs hover:border-accent">+ {t}</button>
            ))}
            <button onClick={() => setShowLib((s) => !s)} className={`rounded-none border px-2 py-1 text-xs ${showLib ? 'border-accent bg-accent text-white' : 'border-border hover:border-accent'}`}>lamp library</button>
          </div>
        </div>
        {showLib && (
          <div className="mt-3 border-t border-border pt-3">
            <p className={label()}>Shared lamp panels — link one (edits apply everywhere)</p>
            <div className="mt-2 space-y-1">
              {sharedPanels.length === 0 && (
                <p className="text-xs text-faint">None yet. Add a lamps panel and “Make shared”, or start one below.</p>
              )}
              {sharedPanels.map((s) => (
                <button
                  key={s.id}
                  onClick={() => addRef(s.id)}
                  className="flex w-full items-center justify-between gap-3 rounded-none border border-border px-2 py-1 text-left text-xs hover:border-accent"
                >
                  <span className="truncate">{s.name}</span>
                  <span className="shrink-0 font-mono text-faint">{s.lamps.length} lamp{s.lamps.length === 1 ? '' : 's'}</span>
                </button>
              ))}
              <button onClick={newSharedPanel} className="mt-1 rounded-none border border-border px-2 py-1 text-xs hover:border-accent">+ new lamp panel</button>
            </div>
          </div>
        )}
        <ul className="mt-3 space-y-1">
          {variant.panels.map((p, i) => (
            <li key={p.id} className={`flex items-center justify-between rounded-none border px-3 py-1.5 text-sm ${p.id === selPanel ? 'border-accent bg-accent/5' : 'border-border'}`}>
              <button onClick={() => { setSelPanel(p.id); setSelDot(null) }} className="flex-1 text-left">
                {panelName(p)}
              </button>
              <span className="flex gap-1">
                <button aria-label="Move panel up" onClick={() => mutVariant((v) => { if (i > 0) [v.panels[i - 1], v.panels[i]] = [v.panels[i], v.panels[i - 1]] })} className="p-1 text-faint hover:text-ink"><ChevronUpIcon className="size-3.5" /></button>
                <button aria-label="Move panel down" onClick={() => mutVariant((v) => { if (i < v.panels.length - 1) [v.panels[i + 1], v.panels[i]] = [v.panels[i], v.panels[i + 1]] })} className="p-1 text-faint hover:text-ink"><ChevronDownIcon className="size-3.5" /></button>
                <button aria-label="Delete panel" onClick={() => { mutVariant((v) => v.panels.splice(i, 1)); if (p.id === selPanel) setSelPanel(null) }} className="p-1 text-sig-red"><CloseIcon className="size-3.5" /></button>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {panel?.type === 'lamps' && (
        <div className="space-y-3">
          <LampsEditor
            panel={panel}
            selDot={selDot}
            setSelDot={setSelDot}
            edit={(fn) => mutVariant((v) => { const p = v.panels.find((x) => x.id === panel.id); if (p?.type === 'lamps') fn(p) })}
          />
          <button onClick={() => makeShared(panel.id)} className="rounded-none border border-border px-3 py-2 text-xs hover:border-accent">
            Make this a shared lamp panel (reusable — edit once, updates everywhere)
          </button>
        </div>
      )}
      {panel?.type === 'lamps-ref' && (() => {
        const def = sharedPanels.find((s) => s.id === panel.ref)
        if (!def) {
          return (
            <div className="rounded-none border border-sig-red/40 bg-surface p-4 text-sm text-sig-red">
              Missing shared lamp panel “{panel.ref}”. Delete this panel or recreate the definition.
            </div>
          )
        }
        return (
          <div className="space-y-3">
            <div className="rounded-none border border-accent/40 bg-accent/5 p-3">
              <p className={`${label()} text-accent`}>Shared lamp panel</p>
              <p className="mt-1 text-xs text-muted">Edits here apply to every signal that links this panel.</p>
              <div className="mt-2 text-sm">
                <TextRow label="name" value={def.name} onChange={(s) => mutShared((list) => { const d = list.find((x) => x.id === def.id); if (d) d.name = s })} />
              </div>
            </div>
            <LampsEditor
              panel={def}
              selDot={selDot}
              setSelDot={setSelDot}
              edit={(fn) => mutShared((list) => { const d = list.find((x) => x.id === def.id); if (d) fn(d) })}
            />
          </div>
        )
      })()}
      {panel && panel.type !== 'lamps' && panel.type !== 'lamps-ref' && (
        <PanelPropsEditor panel={panel} mutVariant={mutVariant} />
      )}
    </div>
  )
}

function LampsEditor({
  panel, selDot, setSelDot, edit,
}: {
  panel: LampBody
  selDot: string | null
  setSelDot: (id: string | null) => void
  edit: (fn: (p: LampBody) => void) => void
}) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [drag, setDrag] = useState<
    | { k: 'dot'; id: string }
    | { k: 'pt'; bi: number; i: number }
    | { k: 'cc'; bi: number }
    | { k: 'cr'; bi: number }
    | null
  >(null)
  const [selBp, setSelBp] = useState<number | null>(null)
  const [selPoint, setSelPoint] = useState<number | null>(null)
  useEffect(() => { setSelBp(null); setSelPoint(null) }, [panel.id])

  const editPanel = edit
  const clamp = (v: number, hi: number) => Math.max(0, Math.min(hi, v))

  const toCoords = (e: PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect()
    return { x: Math.round((e.clientX - r.left) / CANVAS_SCALE), y: Math.round((e.clientY - r.top) / CANVAS_SCALE) }
  }
  const dot = panel.lamps.find((l) => l.id === selDot) ?? null
  const bps = panel.backplates ?? []
  const curBp = selBp != null ? bps[selBp] : null
  const poly = curBp && curBp.kind !== 'circle' ? curBp : null
  const circle = curBp && curBp.kind === 'circle' ? curBp : null
  const point = poly && selPoint != null ? poly.points[selPoint] : null

  const selectBp = (i: number) => { setSelBp(i); setSelPoint(null); setSelDot(null) }
  const addPoly = () => {
    const idx = bps.length
    editPanel((p) => {
      const pad = 2
      ;(p.backplates ??= []).push({ points: [
        { x: pad, y: pad, r: 6 },
        { x: p.w - pad, y: pad, r: 6 },
        { x: p.w - pad, y: p.h - pad, r: 6 },
        { x: pad, y: p.h - pad, r: 6 },
      ] })
    })
    setSelBp(idx); setSelPoint(0); setSelDot(null)
  }
  const addCircle = () => {
    const idx = bps.length
    editPanel((p) => {
      const r = Math.max(1, Math.round(Math.min(p.w, p.h) / 2) - 2)
      ;(p.backplates ??= []).push({ kind: 'circle', cx: Math.round(p.w / 2), cy: Math.round(p.h / 2), r })
    })
    setSelBp(idx); setSelPoint(null); setSelDot(null)
  }
  const removeBp = () => {
    if (selBp == null) return
    const i = selBp
    editPanel((p) => { p.backplates?.splice(i, 1); if (p.backplates && p.backplates.length === 0) delete p.backplates })
    setSelBp(null); setSelPoint(null)
  }
  const addPoint = () => {
    if (!poly || selBp == null) return
    const bi = selBp
    const i = selPoint ?? poly.points.length - 1
    const a = poly.points[i]
    const b = poly.points[(i + 1) % poly.points.length]
    editPanel((p) => { const t = p.backplates?.[bi]; if (t && t.kind !== 'circle') t.points.splice(i + 1, 0, { x: Math.round((a.x + b.x) / 2), y: Math.round((a.y + b.y) / 2), r: 0 }) })
    setSelPoint(i + 1)
  }

  return (
    <div className="rounded-none border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <p className={label()}>Dots — drag to position</p>
        <button
          onClick={() => { const id = uid('dot'); editPanel((p) => p.lamps.push({ id, color: 'red', x: Math.round(p.w / 2), y: Math.round(p.h / 2), r: 11, label: 'Dot' })); setSelDot(id); setSelBp(null); setSelPoint(null) }}
          className="rounded-none border border-border px-2 py-1 text-xs hover:border-accent"
        >
          + dot
        </button>
      </div>

      <div className="mt-3 flex gap-4">
        <div
          ref={canvasRef}
          className="relative shrink-0 rounded-none border border-dashed border-border bg-white"
          style={{ width: panel.w * CANVAS_SCALE, height: panel.h * CANVAS_SCALE }}
          onPointerMove={(e) => {
            if (!drag) return
            const c = toCoords(e)
            if (drag.k === 'dot') editPanel((p) => { const l = p.lamps.find((x) => x.id === drag.id); if (l) { l.x = clamp(c.x, p.w); l.y = clamp(c.y, p.h) } })
            else if (drag.k === 'pt') editPanel((p) => { const t = p.backplates?.[drag.bi]; if (t && t.kind !== 'circle') { const pt = t.points[drag.i]; if (pt) { pt.x = clamp(c.x, p.w); pt.y = clamp(c.y, p.h) } } })
            else if (drag.k === 'cc') editPanel((p) => { const t = p.backplates?.[drag.bi]; if (t && t.kind === 'circle') { t.cx = clamp(c.x, p.w); t.cy = clamp(c.y, p.h) } })
            else editPanel((p) => { const t = p.backplates?.[drag.bi]; if (t && t.kind === 'circle') t.r = Math.max(1, Math.round(Math.hypot(c.x - t.cx, c.y - t.cy))) })
          }}
          onPointerUp={() => setDrag(null)}
          onPointerLeave={() => setDrag(null)}
        >
          {bps.length > 0 && (
            <svg
              className="pointer-events-none absolute inset-0"
              width={panel.w * CANVAS_SCALE}
              height={panel.h * CANVAS_SCALE}
              viewBox={`0 0 ${panel.w} ${panel.h}`}
              style={{ overflow: 'visible' }}
            >
              {bps.map((b, i) => {
                const stroke = i === selBp ? 'rgba(47,111,237,.75)' : 'rgba(20,24,34,.4)'
                return b.kind === 'circle' ? (
                  <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill="none" stroke={stroke} strokeWidth={1.3} vectorEffect="non-scaling-stroke" />
                ) : b.points.length >= 2 ? (
                  <path key={i} d={roundedPolyPath(b.points)} fill="none" stroke={stroke} strokeWidth={1.3} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                ) : null
              })}
            </svg>
          )}
          {panel.lamps.map((l) => (
            <div
              key={l.id}
              onPointerDown={(e) => { (e.target as Element).setPointerCapture(e.pointerId); setSelDot(l.id); setSelBp(null); setSelPoint(null); setDrag({ k: 'dot', id: l.id }) }}
              className="absolute rounded-full"
              style={{
                left: (l.x - l.r) * CANVAS_SCALE, top: (l.y - l.r) * CANVAS_SCALE,
                width: l.r * 2 * CANVAS_SCALE, height: l.r * 2 * CANVAS_SCALE,
                background: DOT_FILL[l.color], border: `2px solid ${l.id === selDot ? '#2f6fed' : 'rgba(0,0,0,.3)'}`,
                cursor: 'grab',
              }}
            />
          ))}
          {poly?.points.map((pt, i) => (
            <div
              key={i}
              onPointerDown={(e) => { (e.target as Element).setPointerCapture(e.pointerId); setSelPoint(i); setSelDot(null); setDrag({ k: 'pt', bi: selBp!, i }) }}
              className="absolute"
              style={{ left: pt.x * CANVAS_SCALE - 5, top: pt.y * CANVAS_SCALE - 5, width: 10, height: 10, background: i === selPoint ? '#2f6fed' : '#ffffff', border: '2px solid #2f6fed', borderRadius: 2, cursor: 'grab' }}
              title={`point ${i + 1}`}
            />
          ))}
          {circle && (
            <>
              <div
                onPointerDown={(e) => { (e.target as Element).setPointerCapture(e.pointerId); setDrag({ k: 'cc', bi: selBp! }) }}
                className="absolute"
                style={{ left: circle.cx * CANVAS_SCALE - 5, top: circle.cy * CANVAS_SCALE - 5, width: 10, height: 10, background: '#2f6fed', border: '2px solid #2f6fed', borderRadius: 2, cursor: 'grab' }}
                title="centre"
              />
              <div
                onPointerDown={(e) => { (e.target as Element).setPointerCapture(e.pointerId); setDrag({ k: 'cr', bi: selBp! }) }}
                className="absolute"
                style={{ left: (circle.cx + circle.r) * CANVAS_SCALE - 5, top: circle.cy * CANVAS_SCALE - 5, width: 10, height: 10, background: '#ffffff', border: '2px solid #2f6fed', borderRadius: '50%', cursor: 'ew-resize' }}
                title="radius"
              />
            </>
          )}
        </div>

        <div className="flex-1 space-y-2 text-sm">
          <NumRow label="panel w" value={panel.w} onChange={(n) => editPanel((p) => { p.w = n })} />
          <NumRow label="panel h" value={panel.h} onChange={(n) => editPanel((p) => { p.h = n })} />

          <div className="mt-1 flex items-center justify-between border-t border-border pt-3">
            <p className={label()}>Backplates</p>
            <span className="flex gap-1">
              <button onClick={addPoly} className="rounded-none border border-border px-2 py-1 text-xs hover:border-accent">+ poly</button>
              <button onClick={addCircle} className="rounded-none border border-border px-2 py-1 text-xs hover:border-accent">+ circle</button>
            </span>
          </div>
          {bps.length === 0 ? (
            <p className="text-xs text-faint">None. Add a soft-grey outline behind the dots.</p>
          ) : (
            <div className="flex flex-wrap gap-1">
              {bps.map((b, i) => (
                <button key={i} onClick={() => selectBp(i)} className={chip(i === selBp)}>
                  {b.kind === 'circle' ? 'circle' : 'poly'} {i + 1}
                </button>
              ))}
            </div>
          )}
          {curBp && (
            <div className="space-y-2 border-t border-border pt-2">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-muted">{curBp.kind === 'circle' ? 'circle' : 'polygon'} {(selBp ?? 0) + 1}</p>
                <button onClick={removeBp} className="text-xs text-sig-red">remove</button>
              </div>
              {circle ? (
                <>
                  <NumRow label="centre x" value={circle.cx} onChange={(n) => editPanel((p) => { const t = p.backplates?.[selBp ?? 0]; if (t && t.kind === 'circle') t.cx = n })} />
                  <NumRow label="centre y" value={circle.cy} onChange={(n) => editPanel((p) => { const t = p.backplates?.[selBp ?? 0]; if (t && t.kind === 'circle') t.cy = n })} />
                  <NumRow label="radius" value={circle.r} onChange={(n) => editPanel((p) => { const t = p.backplates?.[selBp ?? 0]; if (t && t.kind === 'circle') t.r = Math.max(1, n) })} />
                </>
              ) : (
                <>
                  <button onClick={addPoint} className="rounded-none border border-border px-2 py-1 text-xs hover:border-accent">+ point</button>
                  {point ? (
                    <div className="space-y-2">
                      <p className="font-mono text-xs text-muted">point {(selPoint ?? 0) + 1} of {poly!.points.length} — drag on the canvas</p>
                      <NumRow label="x" value={point.x} onChange={(n) => editPanel((p) => { const t = p.backplates?.[selBp ?? 0]; if (t && t.kind !== 'circle') { const pt = t.points[selPoint ?? 0]; if (pt) pt.x = n } })} />
                      <NumRow label="y" value={point.y} onChange={(n) => editPanel((p) => { const t = p.backplates?.[selBp ?? 0]; if (t && t.kind !== 'circle') { const pt = t.points[selPoint ?? 0]; if (pt) pt.y = n } })} />
                      <NumRow label="corner r" value={point.r ?? 0} onChange={(n) => editPanel((p) => { const t = p.backplates?.[selBp ?? 0]; if (t && t.kind !== 'circle') { const pt = t.points[selPoint ?? 0]; if (pt) pt.r = Math.max(0, n) } })} />
                      {poly!.points.length > 3 && (
                        <button onClick={() => { editPanel((p) => { const t = p.backplates?.[selBp ?? 0]; if (t && t.kind !== 'circle') t.points.splice(selPoint ?? 0, 1) }); setSelPoint(null) }} className="text-xs text-sig-red">Delete point</button>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-faint">Tap a point handle to shape the outline, or + point to add one.</p>
                  )}
                </>
              )}
            </div>
          )}

          {dot ? (
            <div className="mt-3 space-y-2 border-t border-border pt-3">
              <p className={label()}>Selected dot</p>
              <label className="flex items-center justify-between gap-2">
                <span>colour</span>
                <select value={dot.color} onChange={(e) => editPanel((p) => { const l = p.lamps.find((x) => x.id === dot.id); if (l) l.color = e.target.value as LampColour })} className={select()}>
                  {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <NumRow label="radius" value={dot.r} onChange={(n) => editPanel((p) => { const l = p.lamps.find((x) => x.id === dot.id); if (l) l.r = n })} />
              <NumRow label="x" value={dot.x} onChange={(n) => editPanel((p) => { const l = p.lamps.find((x) => x.id === dot.id); if (l) l.x = n })} />
              <NumRow label="y" value={dot.y} onChange={(n) => editPanel((p) => { const l = p.lamps.find((x) => x.id === dot.id); if (l) l.y = n })} />
              <TextRow label="id" value={dot.id} onChange={(s) => { editPanel((p) => { const l = p.lamps.find((x) => x.id === dot.id); if (l) l.id = s }); setSelDot(s) }} />
              <TextRow label="label" value={dot.label} onChange={(s) => editPanel((p) => { const l = p.lamps.find((x) => x.id === dot.id); if (l) l.label = s })} />
              <label className="flex items-center justify-between gap-2">
                <span>can flash</span>
                <input
                  type="checkbox"
                  checked={!!dot.canFlash}
                  onChange={(e) => editPanel((p) => { const l = p.lamps.find((x) => x.id === dot.id); if (l) l.canFlash = e.target.checked || undefined })}
                />
              </label>
              <button onClick={() => { editPanel((p) => { p.lamps = p.lamps.filter((x) => x.id !== dot.id) }); setSelDot(null) }} className="text-xs text-sig-red">Delete dot</button>
            </div>
          ) : (
            <p className="text-xs text-faint">Select or add a dot to edit it.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function PanelPropsEditor({ panel, mutVariant }: { panel: Panel; mutVariant: (fn: (v: SignalVariant) => void) => void }) {
  const edit = (fn: (p: Panel) => void) => mutVariant((v) => { const p = v.panels.find((x) => x.id === panel.id); if (p) fn(p) })
  return (
    <div className="space-y-2 rounded-none border border-border bg-surface p-4 text-sm">
      <p className={label()}>{panel.type} properties</p>
      {'label' in panel && <TextRow label="label" value={panel.label} onChange={(s) => edit((p) => { if ('label' in p) p.label = s })} />}
      {panel.type === 'arm' && (
        <SelectRow label="kind" value={panel.kind} options={['stop', 'distant', 'banner']} onChange={(s) => edit((p) => { if (p.type === 'arm') p.kind = s as typeof panel.kind })} />
      )}
      {panel.type === 'arm' && panel.kind === 'banner' && (
        <SelectRow label="bar" value={panel.tone ?? 'black'} options={['black', 'green']} onChange={(s) => edit((p) => { if (p.type === 'arm') p.tone = s === 'green' ? 'green' : undefined })} />
      )}
      {(panel.type === 'feather' || panel.type === 'poslight') && (
        <SelectRow label="dir" value={panel.dir ?? 'ur'} options={['ur', 'ul']} onChange={(s) => edit((p) => { if (p.type === 'feather' || p.type === 'poslight') p.dir = s as 'ur' | 'ul' })} />
      )}
      {panel.type === 'junction' && (
        <TextRow
          label="positions (1–6)"
          value={panel.positions.join(',')}
          onChange={(s) => edit((p) => { if (p.type === 'junction') p.positions = [...new Set(s.split(',').map((x) => parseInt(x.trim(), 10)).filter((n) => n >= 1 && n <= 6))].sort((a, b) => a - b) })}
        />
      )}
      {panel.type === 'glyph' && (
        <TextRow label="fixed text" value={panel.text ?? ''} onChange={(s) => edit((p) => { if (p.type === 'glyph') p.text = s || undefined })} />
      )}
      {panel.type === 'sign' && (
        <>
          <SelectRow label="kind" value={panel.kind} options={['psr', 'psr-diff', 'psr-diverge', 'psr-warn', 'psr-warn-diverge', 'tsr-warn', 'tsr-commence', 'tsr-terminate', 'de-mast-main', 'de-mast-distant', 'de-mast-black', 'de-mast-red', 'de-mast-dots', 'de-mast-vf', 'de-vorsignaltafel']} onChange={(s) => edit((p) => { if (p.type === 'sign') p.kind = s as typeof panel.kind })} />
          <TextRow label="primary" value={panel.primary ?? ''} onChange={(s) => edit((p) => { if (p.type === 'sign') p.primary = s || undefined })} />
          <TextRow label="secondary" value={panel.secondary ?? ''} onChange={(s) => edit((p) => { if (p.type === 'sign') p.secondary = s || undefined })} />
          <SelectRow label="arrow" value={panel.arrow ?? 'none'} options={['none', 'left', 'right']} onChange={(s) => edit((p) => { if (p.type === 'sign') p.arrow = s === 'none' ? undefined : (s as 'left' | 'right') })} />
        </>
      )}
    </div>
  )
}

/* ---- Aspect editor ----------------------------------------------- */

const CYCLE: Record<DotState, DotState> = { off: 'on', on: 'flash', flash: 'off' }
const ASPECT_TEXT: Array<keyof Aspect> = ['id', 'name', 'meaning', 'concept', 'whatItMeans', 'whatYouDo', 'sequenceNote', 'safetyInteraction', 'lookAlikes', 'controls', 'realWorldNote']

function AspectEditor({
  variant, selAspect, setSelAspect, mutVariant, conceptOptions,
}: {
  variant: SignalVariant
  selAspect: number
  setSelAspect: (i: number) => void
  mutVariant: (fn: (v: SignalVariant) => void) => void
  conceptOptions: { concept: string; sample: string }[]
}) {
  const aspect = variant.aspects[selAspect]
  const editAspect = (fn: (a: Aspect) => void) => mutVariant((v) => { const a = v.aspects[selAspect]; if (a) fn(a) })
  const [dragIdx, setDragIdx] = useState<number | null>(null)
  const [overIdx, setOverIdx] = useState<number | null>(null)

  /** Move an aspect, keeping the selection on whichever aspect was selected before. */
  const moveAspect = (from: number, to: number) => {
    if (from === to) return
    const order = variant.aspects.map((_, i) => i)
    order.splice(to, 0, ...order.splice(from, 1))
    mutVariant((v) => v.aspects.splice(to, 0, ...v.aspects.splice(from, 1)))
    const next = order.indexOf(selAspect)
    if (next !== -1) setSelAspect(next)
  }
  /** Insertion marker on the edge of the chip the dragged aspect would land on. */
  const dropEdge = (i: number) => {
    if (dragIdx === null || dragIdx === i || overIdx !== i) return undefined
    const c = i === selAspect ? '#ffffff' : '#2f6fed'
    return { boxShadow: `inset ${dragIdx < i ? '-3px' : '3px'} 0 0 0 ${c}` }
  }

  const lamps = variant.panels.flatMap((p) => (p.type === 'lamps' ? p.lamps : []))
  const arms = variant.panels.filter((p): p is ArmPanel => p.type === 'arm')
  const aux = variant.panels.filter(
    (p): p is PosLightPanel | FeatherPanel => p.type === 'poslight' || p.type === 'feather',
  )
  const junctions = variant.panels.filter((p): p is JunctionPanel => p.type === 'junction')
  const glyphs = variant.panels.filter(
    (p): p is GlyphPanel => p.type === 'glyph' && p.text === undefined,
  )

  return (
    <div className="space-y-4">
      <div className="rounded-none border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <p className={label()}>Aspects</p>
          <button
            onClick={() => { mutVariant((v) => v.aspects.push({ id: uid('aspect'), name: 'New aspect', meaning: '', concept: uid('concept'), whatItMeans: '', whatYouDo: '' })); setSelAspect(variant.aspects.length) }}
            className="rounded-none border border-border px-2 py-1 text-xs hover:border-accent"
          >
            + aspect
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {variant.aspects.map((a, i) => (
            <button
              key={a.id}
              draggable
              onDragStart={(e) => { setDragIdx(i); e.dataTransfer.effectAllowed = 'move' }}
              onDragOver={(e) => { if (dragIdx === null) return; e.preventDefault(); e.dataTransfer.dropEffect = 'move'; setOverIdx(i) }}
              onDrop={(e) => { e.preventDefault(); if (dragIdx !== null) moveAspect(dragIdx, i); setDragIdx(null); setOverIdx(null) }}
              onDragEnd={() => { setDragIdx(null); setOverIdx(null) }}
              onClick={() => setSelAspect(i)}
              style={dropEdge(i)}
              className={`${chip(i === selAspect)} cursor-grab ${dragIdx === i ? 'opacity-40' : ''}`}
            >
              {a.name || a.id}
            </button>
          ))}
        </div>
        {variant.aspects.length > 1 && <p className="mt-2 text-xs text-faint">Drag aspects to reorder.</p>}
      </div>

      {aspect && (
        <>
          <div className="rounded-none border border-border bg-surface p-4">
            <p className={label()}>State for “{aspect.name}”</p>
            <div className="mt-2 space-y-1.5 text-sm">
              {lamps.map((l) => {
                const s = aspect.lamps?.[l.id] ?? 'off'
                return (
                  <button key={l.id} onClick={() => editAspect((a) => { a.lamps = { ...a.lamps, [l.id]: CYCLE[s] }; if (a.lamps[l.id] === 'off') delete a.lamps[l.id] })} className="flex w-full items-center justify-between rounded-none border border-border px-3 py-1.5">
                    <span className="flex items-center gap-2"><span className="inline-block size-3 rounded-full" style={{ background: s === 'off' ? 'transparent' : DOT_FILL[l.color], boxShadow: `inset 0 0 0 2px ${DOT_FILL[l.color]}` }} />{l.label}</span>
                    <span className="font-mono text-xs">{s}</span>
                  </button>
                )
              })}
              {arms.map((p) => {
                const pos = aspect.arms?.[p.id] ?? 'danger'
                return (
                  <button key={p.id} onClick={() => editAspect((a) => { a.arms = { ...a.arms, [p.id]: pos === 'clear' ? 'danger' : 'clear' } })} className="flex w-full items-center justify-between rounded-none border border-border px-3 py-1.5">
                    <span>{p.label}</span><span className="font-mono text-xs">{pos}</span>
                  </button>
                )
              })}
              {aux.map((p) => {
                const on = aspect.on?.includes(p.id) ?? false
                return (
                  <button key={p.id} onClick={() => editAspect((a) => { const set = new Set(a.on ?? []); on ? set.delete(p.id) : set.add(p.id); a.on = [...set] })} className="flex w-full items-center justify-between rounded-none border border-border px-3 py-1.5">
                    <span>{p.label}</span><span className="font-mono text-xs">{on ? 'on' : 'off'}</span>
                  </button>
                )
              })}
              {junctions.map((p) => {
                const lit = aspect.feathers?.[p.id] ?? []
                return (
                  <div key={p.id} className="rounded-none border border-border px-3 py-1.5">
                    <span>{p.label}</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {p.positions.map((pos) => (
                        <button
                          key={pos}
                          onClick={() => editAspect((a) => {
                            const cur = a.feathers?.[p.id] ?? []
                            const next = cur.includes(pos) ? cur.filter((x) => x !== pos) : [...cur, pos].sort((x, y) => x - y)
                            a.feathers = { ...a.feathers, [p.id]: next }
                            if (!next.length) delete a.feathers[p.id]
                          })}
                          className={chip(lit.includes(pos))}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
              {glyphs.map((p) => (
                <label key={p.id} className="flex items-center justify-between gap-2 rounded-none border border-border px-3 py-1.5">
                  <span>{p.label}</span>
                  <input value={aspect.glyphs?.[p.id] ?? ''} onChange={(e) => editAspect((a) => { a.glyphs = { ...a.glyphs, [p.id]: e.target.value } })} className="w-16 rounded-none border border-border px-2 py-0.5 text-center font-mono" />
                </label>
              ))}
            </div>
            <button onClick={() => { mutVariant((v) => v.aspects.splice(selAspect, 1)); setSelAspect(0) }} className="mt-3 text-xs text-sig-red">Delete aspect</button>
          </div>

          <div className="space-y-2 rounded-none border border-border bg-surface p-4 text-sm">
            <p className={label()}>Information</p>
            {ASPECT_TEXT.map((k) => (
              <label key={k} className="block">
                <span className="font-mono text-xs text-muted">{k}</span>
                {k === 'concept' ? (
                  <input
                    list="editor-concepts"
                    value={aspect.concept ?? ''}
                    onChange={(e) => editAspect((a) => { a.concept = e.target.value })}
                    placeholder="pick an existing concept or type a new one"
                    className="mt-0.5 w-full rounded-none border border-border px-2 py-1 font-mono text-xs"
                  />
                ) : (
                  <textarea
                    rows={k === 'whatItMeans' || k === 'whatYouDo' ? 2 : 1}
                    value={(aspect[k] as string) ?? ''}
                    onChange={(e) => editAspect((a) => { (a as unknown as Record<string, unknown>)[k] = e.target.value })}
                    className="mt-0.5 w-full resize-y rounded-none border border-border px-2 py-1"
                  />
                )}
              </label>
            ))}
            <datalist id="editor-concepts">
              {conceptOptions.map((o) => (
                <option key={o.concept} value={o.concept}>{o.sample}</option>
              ))}
            </datalist>
          </div>
        </>
      )}
    </div>
  )
}

/* ---- little shared bits ------------------------------------------ */

function Header({ status, children }: { status: string; children?: React.ReactNode }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="mr-2 text-2xl font-bold tracking-tight">Signal editor</h1>
        {children}
      </div>
      {status && <p className="mt-2 font-mono text-xs text-muted">{status}</p>}
    </div>
  )
}
const label = () => 'font-mono text-xs font-semibold uppercase tracking-widest text-muted'
const select = () => 'rounded-none border border-border bg-white px-2 py-1 text-sm'
const chip = (active: boolean) => `rounded-none border px-3 py-1 text-sm ${active ? 'border-accent bg-accent text-white' : 'border-border bg-white text-muted hover:border-accent'}`
const tabBtn = (active: boolean) => `flex-1 rounded-none border px-3 py-1.5 text-sm font-medium ${active ? 'border-accent bg-accent text-white' : 'border-border'}`

function NumRow({ label: l, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <label className="flex items-center justify-between gap-2">
      <span>{l}</span>
      <input type="number" value={value} onChange={(e) => onChange(Math.round(+e.target.value))} className="w-20 rounded-none border border-border px-2 py-0.5 text-right font-mono" />
    </label>
  )
}
function TextRow({ label: l, value, onChange }: { label: string; value: string; onChange: (s: string) => void }) {
  return (
    <label className="flex items-center justify-between gap-2">
      <span>{l}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-40 rounded-none border border-border px-2 py-0.5 font-mono text-xs" />
    </label>
  )
}
function SelectRow({ label: l, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (s: string) => void }) {
  return (
    <label className="flex items-center justify-between gap-2">
      <span>{l}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={select()}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  )
}
