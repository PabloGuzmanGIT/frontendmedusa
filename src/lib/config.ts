import DBH from "@medusajs/js-sdk"

// Defaults to standard port for DBH server
// let MEDUSA_BACKEND_URL = "http://localhost:9000"
let MEDUSA_BACKEND_URL = "https://livingandesbackend-production.up.railway.app"

if (process.env.MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL
}

export const sdk = new DBH({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

// added to render blog 

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:9000"

export const PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

/** Attach the publishable key header to any fetch */
export const withKey = (extra: HeadersInit = {}) =>
  PUBLISHABLE_KEY
    ? { "x-publishable-api-key": PUBLISHABLE_KEY, ...extra }
    : extra

/** Optional: a small wrapper so you never forget the header */
export async function api(path: string, init: RequestInit = {}) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers: { ...withKey(), ...(init.headers || {}) },
  })
  return res
}
