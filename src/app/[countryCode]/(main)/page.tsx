import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import HeroCarousel from "@modules/blog/components/hero-carousel"
import { listPosts } from "@lib/data/blog"

export const metadata: Metadata = {
  title: "DBH Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and DBH.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }
   // 🚀 get latest 6 posts for the current locale
  const heroPosts = await listPosts(countryCode, 6, 0)

  return (
    <>
      <HeroCarousel posts={heroPosts} basePath={`/${countryCode}/blog`}/>
      
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
