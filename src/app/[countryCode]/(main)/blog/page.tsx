// src/app/[countryCode]/(main)/blog/page.tsx
import Link from "next/link"
import HeroCarousel from "../../../../modules/blog/components/hero-carousel"
import { listPosts } from "../../../../lib/data/blog"
import { cld } from "../../../../lib/util/cloudinary"

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ page?: string }>
}

const PAGE_SIZE = 12
export const revalidate = 60

export default async function BlogIndex(props: Props) {
  const { countryCode } = await props.params
  const { page } = await props.searchParams

  const locale = countryCode
  const pageNum = Math.max(1, Number(page ?? 1))
  const offset = (pageNum - 1) * PAGE_SIZE

  const [featured, posts] = await Promise.all([
    listPosts(locale, 6, 0),
    listPosts(locale, PAGE_SIZE, offset),
  ])

  const base = `/${locale}/blog`

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <HeroCarousel posts={featured} basePath={base} />

      <h1 className="text-3xl font-semibold mt-8 mb-6">Blog</h1>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug} className="rounded-xl border p-3 hover:shadow">
            {p.cover_url && (
              <img
                src={cld(p.cover_url, "f_auto,q_auto,w_400")}
                alt={p.cover_alt || p.title}
                className="mb-3 rounded-md"
              />
            )}
            <Link
              href={`${base}/${p.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              {p.title}
            </Link>
            {p.excerpt && <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>}
          </li>
        ))}
      </ul>
    </main>
  )
}

