/**
 * Versioned disclaimer gate state.
 *
 * The acknowledgement is stored in localStorage. Bumping DISCLAIMER_VERSION
 * (e.g. after a wording change) re-gates everyone, because the stored version
 * no longer matches the current one.
 */
export const DISCLAIMER_VERSION = '2026-07-15.1'

const STORAGE_KEY = 'signals.disclaimer'

export function hasAcceptedDisclaimer(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === DISCLAIMER_VERSION
  } catch {
    return false
  }
}

export function acceptDisclaimer(): void {
  try {
    localStorage.setItem(STORAGE_KEY, DISCLAIMER_VERSION)
  } catch {
    /* ignore */
  }
}
