import { useEffect, useRef, useState, type PointerEvent } from 'react'
import type {
  ArmPanel,
  Aspect,
  DotState,
  FeatherPanel,
  GlyphPanel,
  LampColour,
  LampsPanel,
  Panel,
  PosLightPanel,
  SignalFamily,
  SignalVariant,
} from '@/data/types'
import { SignalRenderer } from '@/components/signal/SignalRenderer'
import { ArrowRightIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@/components/icons'
import { listFamilies, loadFamily, saveFamily } from '@/lib/editor-api'
import { COUNTRIES } from '@/data/countries'
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

  const refresh = (c: string) => listFamilies(c).then(setIds).catch((e) => setStatus(String(e)))
  useEffect(() => {
    refresh(country)
  }, [country])

  useEffect(() => {
    if (!familyId) {
      setFamily(null)
      return
    }
    loadFamily(country, familyId)
      .then((f) => {
        setFamily(f)
        setVi(0)
        setSelPanel(f.variants[0]?.panels[0]?.id ?? null)
        setSelDot(null)
        setSelAspect(0)
        setStatus('')
      })
      .catch((e) => setStatus(String(e)))
  }, [familyId, country])

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
      await refresh(country)
      setStatus('saved — reload the app to see it live')
    } catch (e) {
      setStatus(String(e))
    }
  }

  const aspect = variant.aspects[selAspect]
  const aspectState = aspect
    ? { lamps: aspect.lamps, arms: aspect.arms, on: aspect.on, glyphs: aspect.glyphs }
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
            <SignalRenderer panels={variant.panels} state={aspectState} scale={1.8} showInactive={tab === 'structure'} />
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
            />
          ) : (
            <AspectEditor
              variant={variant}
              selAspect={selAspect}
              setSelAspect={setSelAspect}
              mutVariant={mutVariant}
            />
          )}
        </div>
      </div>
    </div>
  )
}

/* ---- Structure editor -------------------------------------------- */

function StructureEditor({
  variant, selPanel, setSelPanel, selDot, setSelDot, mutVariant,
}: {
  variant: SignalVariant
  selPanel: string | null
  setSelPanel: (id: string | null) => void
  selDot: string | null
  setSelDot: (id: string | null) => void
  mutVariant: (fn: (v: SignalVariant) => void) => void
}) {
  const panel = variant.panels.find((p) => p.id === selPanel) ?? null

  const addPanel = (type: Panel['type']) => {
    const id = uid(type)
    let np: Panel
    if (type === 'lamps') np = { type, id, w: 30, h: 120, lamps: [] }
    else if (type === 'arm') np = { type, id, kind: 'stop', label: 'Arm' }
    else if (type === 'poslight') np = { type, id, dir: 'ur', r: 7, label: 'Position light' }
    else if (type === 'feather') np = { type, id, dir: 'ur', r: 5, label: 'Feather' }
    else if (type === 'glyph') np = { type, id, size: 24, label: 'Glyph' }
    else np = { type: 'sign', id, kind: 'psr', primary: '40', size: 34, label: 'Sign' }
    mutVariant((v) => v.panels.push(np))
    setSelPanel(id)
    setSelDot(null)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-none border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <p className={label()}>Panels (top → bottom)</p>
          <div className="flex flex-wrap gap-1">
            {(['lamps', 'arm', 'feather', 'poslight', 'glyph', 'sign'] as const).map((t) => (
              <button key={t} onClick={() => addPanel(t)} className="rounded-none border border-border px-2 py-1 text-xs hover:border-accent">+ {t}</button>
            ))}
          </div>
        </div>
        <ul className="mt-3 space-y-1">
          {variant.panels.map((p, i) => (
            <li key={p.id} className={`flex items-center justify-between rounded-none border px-3 py-1.5 text-sm ${p.id === selPanel ? 'border-accent bg-accent/5' : 'border-border'}`}>
              <button onClick={() => { setSelPanel(p.id); setSelDot(null) }} className="flex-1 text-left">
                {p.type}{'label' in p && p.label ? ` · ${p.label}` : ''}
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
        <LampsEditor panel={panel} selDot={selDot} setSelDot={setSelDot} mutVariant={mutVariant} />
      )}
      {panel && panel.type !== 'lamps' && (
        <PanelPropsEditor panel={panel} mutVariant={mutVariant} />
      )}
    </div>
  )
}

function LampsEditor({
  panel, selDot, setSelDot, mutVariant,
}: {
  panel: LampsPanel
  selDot: string | null
  setSelDot: (id: string | null) => void
  mutVariant: (fn: (v: SignalVariant) => void) => void
}) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [drag, setDrag] = useState<string | null>(null)
  const editPanel = (fn: (p: LampsPanel) => void) =>
    mutVariant((v) => { const p = v.panels.find((x) => x.id === panel.id); if (p?.type === 'lamps') fn(p) })

  const toCoords = (e: PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect()
    return { x: Math.round((e.clientX - r.left) / CANVAS_SCALE), y: Math.round((e.clientY - r.top) / CANVAS_SCALE) }
  }
  const dot = panel.lamps.find((l) => l.id === selDot) ?? null

  return (
    <div className="rounded-none border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <p className={label()}>Dots — drag to position</p>
        <button
          onClick={() => { const id = uid('dot'); editPanel((p) => p.lamps.push({ id, color: 'red', x: Math.round(p.w / 2), y: Math.round(p.h / 2), r: 11, label: 'Dot' })); setSelDot(id) }}
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
          onPointerMove={(e) => { if (drag) { const c = toCoords(e); editPanel((p) => { const l = p.lamps.find((x) => x.id === drag); if (l) { l.x = Math.max(0, Math.min(p.w, c.x)); l.y = Math.max(0, Math.min(p.h, c.y)) } }) } }}
          onPointerUp={() => setDrag(null)}
          onPointerLeave={() => setDrag(null)}
        >
          {panel.lamps.map((l) => (
            <div
              key={l.id}
              onPointerDown={(e) => { (e.target as Element).setPointerCapture(e.pointerId); setSelDot(l.id); setDrag(l.id) }}
              className="absolute rounded-full"
              style={{
                left: (l.x - l.r) * CANVAS_SCALE, top: (l.y - l.r) * CANVAS_SCALE,
                width: l.r * 2 * CANVAS_SCALE, height: l.r * 2 * CANVAS_SCALE,
                background: DOT_FILL[l.color], border: `2px solid ${l.id === selDot ? '#2f6fed' : 'rgba(0,0,0,.3)'}`,
                cursor: 'grab',
              }}
            />
          ))}
        </div>

        <div className="flex-1 space-y-2 text-sm">
          <NumRow label="panel w" value={panel.w} onChange={(n) => editPanel((p) => { p.w = n })} />
          <NumRow label="panel h" value={panel.h} onChange={(n) => editPanel((p) => { p.h = n })} />
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
              <TextRow label="id" value={dot.id} onChange={(s) => editPanel((p) => { const l = p.lamps.find((x) => x.id === dot.id); if (l) l.id = s })} />
              <TextRow label="label" value={dot.label} onChange={(s) => editPanel((p) => { const l = p.lamps.find((x) => x.id === dot.id); if (l) l.label = s })} />
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
      {(panel.type === 'feather' || panel.type === 'poslight') && (
        <SelectRow label="dir" value={panel.dir ?? 'ur'} options={['ur', 'ul']} onChange={(s) => edit((p) => { if (p.type === 'feather' || p.type === 'poslight') p.dir = s as 'ur' | 'ul' })} />
      )}
      {panel.type === 'glyph' && (
        <TextRow label="fixed text" value={panel.text ?? ''} onChange={(s) => edit((p) => { if (p.type === 'glyph') p.text = s || undefined })} />
      )}
      {panel.type === 'sign' && (
        <>
          <SelectRow label="kind" value={panel.kind} options={['psr', 'psr-diff', 'tsr-warn', 'tsr-commence', 'tsr-terminate']} onChange={(s) => edit((p) => { if (p.type === 'sign') p.kind = s as typeof panel.kind })} />
          <TextRow label="primary" value={panel.primary ?? ''} onChange={(s) => edit((p) => { if (p.type === 'sign') p.primary = s || undefined })} />
          <TextRow label="secondary" value={panel.secondary ?? ''} onChange={(s) => edit((p) => { if (p.type === 'sign') p.secondary = s || undefined })} />
        </>
      )}
    </div>
  )
}

/* ---- Aspect editor ----------------------------------------------- */

const CYCLE: Record<DotState, DotState> = { off: 'on', on: 'flash', flash: 'off' }
const ASPECT_TEXT: Array<keyof Aspect> = ['id', 'name', 'meaning', 'concept', 'whatItMeans', 'whatYouDo', 'sequenceNote', 'safetyInteraction', 'lookAlikes', 'controls', 'realWorldNote']

function AspectEditor({
  variant, selAspect, setSelAspect, mutVariant,
}: {
  variant: SignalVariant
  selAspect: number
  setSelAspect: (i: number) => void
  mutVariant: (fn: (v: SignalVariant) => void) => void
}) {
  const aspect = variant.aspects[selAspect]
  const editAspect = (fn: (a: Aspect) => void) => mutVariant((v) => { const a = v.aspects[selAspect]; if (a) fn(a) })
  const lamps = variant.panels.flatMap((p) => (p.type === 'lamps' ? p.lamps : []))
  const arms = variant.panels.filter((p): p is ArmPanel => p.type === 'arm')
  const aux = variant.panels.filter(
    (p): p is PosLightPanel | FeatherPanel => p.type === 'poslight' || p.type === 'feather',
  )
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
            <button key={a.id} onClick={() => setSelAspect(i)} className={chip(i === selAspect)}>{a.name || a.id}</button>
          ))}
        </div>
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
                <textarea
                  rows={k === 'whatItMeans' || k === 'whatYouDo' ? 2 : 1}
                  value={(aspect[k] as string) ?? ''}
                  onChange={(e) => editAspect((a) => { (a as unknown as Record<string, unknown>)[k] = e.target.value })}
                  className="mt-0.5 w-full resize-y rounded-none border border-border px-2 py-1"
                />
              </label>
            ))}
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
