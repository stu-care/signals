import type { SharedLampPanel, SignalFamily } from '@/data/types'

/** Client for the dev-only editor backend (see vite-editor-plugin.ts). */

export async function listFamilies(country: string): Promise<string[]> {
  const res = await fetch(`/api/editor/families?country=${country}`)
  if (!res.ok) throw new Error(`list failed: ${res.status}`)
  return (await res.json()).ids as string[]
}

export async function loadFamily(country: string, id: string): Promise<SignalFamily> {
  const res = await fetch(`/api/editor/family?country=${country}&id=${id}`)
  if (!res.ok) throw new Error(`load failed: ${res.status}`)
  return (await res.json()) as SignalFamily
}

export async function saveFamily(country: string, family: SignalFamily): Promise<void> {
  const res = await fetch(`/api/editor/family?country=${country}&id=${family.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(family),
  })
  if (!res.ok) throw new Error(`save failed: ${res.status} ${await res.text()}`)
}

export async function loadLampPanels(country: string): Promise<SharedLampPanel[]> {
  const res = await fetch(`/api/editor/lamp-panels?country=${country}`)
  if (!res.ok) throw new Error(`lamp-panels load failed: ${res.status}`)
  return (await res.json()) as SharedLampPanel[]
}

export async function saveLampPanels(country: string, panels: SharedLampPanel[]): Promise<void> {
  const res = await fetch(`/api/editor/lamp-panels?country=${country}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(panels),
  })
  if (!res.ok) throw new Error(`lamp-panels save failed: ${res.status} ${await res.text()}`)
}
