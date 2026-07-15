import type { Plugin } from 'vite'
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

/**
 * Dev-only editor backend. Reads and writes the signal-family JSON files under
 * src/data/<country>/families/ so the in-app signal editor can persist changes
 * to disk. `apply: 'serve'` means this middleware exists only in the dev server
 * — it is never part of the production build.
 */
const ID_RE = /^[a-z0-9-]+$/

export function editorPlugin(): Plugin {
  return {
    name: 'signals-editor-api',
    apply: 'serve',
    configureServer(server) {
      const familiesDir = (country: string) =>
        path.resolve(process.cwd(), 'src/data', country, 'families')

      const send = (res: import('http').ServerResponse, code: number, body: unknown) => {
        res.statusCode = code
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(body))
      }

      server.middlewares.use('/api/editor', async (req, res) => {
        try {
          const url = new URL(req.url ?? '', 'http://localhost')
          const country = url.searchParams.get('country') ?? 'uk'
          const id = url.searchParams.get('id') ?? ''
          if (!ID_RE.test(country)) return send(res, 400, { error: 'bad country' })

          // GET /families — list family ids for a country (empty if none yet).
          if (url.pathname.startsWith('/families') && req.method === 'GET') {
            let files: string[] = []
            try {
              files = await readdir(familiesDir(country))
            } catch {
              files = []
            }
            const ids = files.filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5))
            return send(res, 200, { ids })
          }

          // /family?country&id — GET reads, PUT writes.
          if (url.pathname.startsWith('/family')) {
            if (!ID_RE.test(id)) return send(res, 400, { error: 'bad id' })
            const file = path.join(familiesDir(country), `${id}.json`)

            if (req.method === 'GET') {
              const text = await readFile(file, 'utf8')
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              return res.end(text)
            }

            if (req.method === 'PUT') {
              const chunks: Buffer[] = []
              for await (const c of req) chunks.push(c as Buffer)
              const raw = Buffer.concat(chunks).toString('utf8')
              const parsed = JSON.parse(raw) // validate it is JSON
              if (parsed?.id !== id) return send(res, 400, { error: 'id mismatch' })
              await mkdir(familiesDir(country), { recursive: true })
              await writeFile(file, JSON.stringify(parsed, null, 2) + '\n', 'utf8')
              return send(res, 200, { ok: true })
            }
          }

          return send(res, 404, { error: 'not found' })
        } catch (err) {
          return send(res, 500, { error: String(err) })
        }
      })
    },
  }
}
