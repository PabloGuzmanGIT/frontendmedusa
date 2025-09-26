// src/lib/data/blog.ts
export type Post = {
  slug: string
  title: string
  excerpt?: string
  content_md: string
  cover_url?: string
  cover_alt?: string
  meta_title?: string
  meta_description?: string
  canonical_url?: string
  published_at?: string
  updated_at?: string
  tags?: string[]
  content_html:string
  // add any other fields you want to use
}

// Prefer your existing config if present, else env, else localhost
// (adjust this line if your config file exports something different)
// // const API_BASE =
// //   (process.env.NEXT_PUBLIC_API_BASE as string) ||
// //   (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL as string) ||
// //   "http://localhost:9000"

// // export async function listPosts(locale: string, limit = 12, offset = 0) {
// //   const r = await fetch(
// //     `${API_BASE}/store/posts?locale=${locale}&limit=${limit}&offset=${offset}`,
// //     { cache: "no-store" }
// //   )
// //   if (!r.ok) throw new Error("Failed to list posts")
// //   return (await r.json()).posts as Post[]
// // }

// // export async function getPost(locale: string, slug: string) {
// //   const r = await fetch(`${API_BASE}/store/posts/${slug}?locale=${locale}`, {
// //     cache: "no-store",
// //   })
// //   if (!r.ok) throw new Error("Post not found")
// //   return (await r.json()).post as Post
// // }

// // export type { Post }
const API_BASE =
  (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL as string) ||
  "http://localhost:9000"

const DEFAULT_HEADERS: HeadersInit = {}
if (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
  DEFAULT_HEADERS["x-publishable-api-key"] =
    process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY as string
}

export async function listPosts(locale: string, limit = 12, offset = 0) {
  const url = `${API_BASE}/store/posts?locale=${encodeURIComponent(
    locale
  )}&limit=${limit}&offset=${offset}`
  const r = await fetch(url, { cache: "no-store", headers: DEFAULT_HEADERS })
  if (!r.ok) {
    const txt = await r.text()
    throw new Error(`Failed to list posts (${r.status}): ${txt}`)
  }
  return (await r.json()).posts as Post[]
}

export async function getPost(locale: string, slug: string) {
  const url = `${API_BASE}/store/posts/${encodeURIComponent(
    slug
  )}?locale=${encodeURIComponent(locale)}`
  const r = await fetch(url, { cache: "no-store", headers: DEFAULT_HEADERS })
  if (!r.ok) {
    const txt = await r.text()
    throw new Error(`Post fetch failed (${r.status}): ${txt}`)
  }
  return (await r.json()).post as Post
}

