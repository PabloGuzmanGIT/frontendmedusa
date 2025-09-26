// "use client"

// import Link from "next/link"
// import { useEffect, useRef, useState } from "react"
// import { Post } from "@lib/data/blog"
// import { cld } from "../../../../lib/util/cloudinary"


// // export default function HeroCarousel
// const HeroCarousel = () => ({
//   posts, basePath, intervalMs = 5000,
// }: { posts: Post[]; basePath: string; intervalMs?: number }) => {
//   const elRef = useRef<HTMLDivElement>(null)
//   const [index, setIndex] = useState(0)
//   const count = posts.length

//   function goTo(i: number) {
//     const el = elRef.current
//     if (!el || count === 0) return
//     const next = (i + count) % count
//     setIndex(next)
//     el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" })
//   }

//   useEffect(() => {
//     const el = elRef.current
//     if (!el) return
//     const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth))
//     el.addEventListener("scroll", onScroll, { passive: true })
//     return () => el.removeEventListener("scroll", onScroll)
//   }, [count])

//   useEffect(() => {
//     if (count < 2) return
//     const id = setInterval(() => goTo(index + 1), intervalMs)
//     return () => clearInterval(id)
//   }, [index, count, intervalMs])

//   if (!count) return null

//   return (
//     <section aria-label="Recent posts" className="relative">
//       <div ref={elRef} className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-2xl ring-1 ring-black/10"
//            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
//         {posts.map((p, i) => (
//           <article key={p.slug} className="min-w-full snap-start relative">
//             <Link href={`${basePath}/${p.slug}`} target="_blank" rel="noopener noreferrer" className="block group">
//               {p.cover_url ? (
//                 <img src={cld(p.cover_url, "f_auto,q_auto,w_1600,h_600,c_fill")}
//                      alt={p.cover_alt || p.title}
//                      className="h-64 w-full object-cover md:h-80"
//                      loading={i === 0 ? "eager" : "lazy"} />
//               ) : (
//                 <div className="h-64 w-full md:h-80 bg-gradient-to-r from-zinc-200 to-zinc-300" />
//               )}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//               <h2 className="absolute bottom-3 left-4 right-4 text-white text-xl md:text-2xl font-semibold drop-shadow">
//                 {p.title}
//               </h2>
//             </Link>
//           </article>
//         ))}
//       </div>

//       {count > 1 && (
//         <>
//           <button aria-label="Previous"
//                   className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur"
//                   onClick={() => goTo(index - 1)}>‹</button>
//           <button aria-label="Next"
//                   className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur"
//                   onClick={() => goTo(index + 1)}>›</button>
//           <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
//             {posts.map((_, i) => (
//               <button key={i} aria-label={`Go to slide ${i + 1}`}
//                       onClick={() => goTo(i)}
//                       className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`} />
//             ))}
//           </div>
//         </>
//       )}
//     </section>
//   )
// }


// export default HeroCarousel
"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Post } from "@lib/data/blog"
import { cld } from "../../../../lib/util/cloudinary"

type Props = {
  posts: Post[]
  basePath: string
  intervalMs?: number
}

const HeroCarousel: React.FC<Props> = ({
  posts,
  basePath,
  intervalMs = 5000,
}) => {
  const elRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const count = posts.length

  function goTo(i: number) {
    const el = elRef.current
    if (!el || count === 0) return
    const next = (i + count) % count
    setIndex(next)
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" })
  }

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth))
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [count])

  useEffect(() => {
    if (count < 2) return
    const id = setInterval(() => goTo(index + 1), intervalMs)
    return () => clearInterval(id)
  }, [index, count, intervalMs])

  if (!count) return null

  return (
    <section aria-label="Recent posts" className="relative">
      <div
        ref={elRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-2xl ring-1 ring-black/10 "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {posts.map((p, i) => (
          <article key={p.slug} className="min-w-full px-2 snap-start relative">
            <Link
              href={`${basePath}/${p.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              {p.cover_url ? (
                <img
                  src={cld(p.cover_url, "f_auto,q_auto,w_1600,h_1200,c_fill")}
                  alt={p.cover_alt || p.title}
                  className="h-80 w-full object-cover md:h-[28rem]"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ) : (
                <div className="h-72 w-full md:h-96 bg-gradient-to-r from-zinc-200 to-zinc-300" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h2 className="absolute bottom-3 left-4 right-4 text-white text-xxl md:text-2xl font-semibold drop-shadow">
                {p.title}
              </h2>
            </Link>
          </article>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur"
            onClick={() => goTo(index - 1)}
          >
            ‹
          </button>
          <button
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur"
            onClick={() => goTo(index + 1)}
          >
            ›
          </button>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {posts.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 w-2 rounded-full ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default HeroCarousel
