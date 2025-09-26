// src/app/[countryCode]/(main)/blog/[slug]/page.tsx



import { getPost } from "@lib/data/blog"

import { cld } from "@lib/util/cloudinary"
import MdxContent from "@modules/blog/components/MarkdownContent";
import MarkdownContent from "@modules/blog/components/MarkdownContent"
import Markdown from "@lib/markdown";








type Props = { params: Promise<{ countryCode: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const post = await getPost((await params).countryCode, (await params).slug)
  const canonical = post.canonical_url || `https://www.livingandesstore.com/${(await params).countryCode}/blog/${post.slug}`
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.cover_url ? [{ url: cld(post.cover_url, "f_auto,q_auto,w_1200,h_630,c_fill") }] : [],
      type: "article",
    },
  }
}

export default async function Page({ params }: Props) {
  const post = await getPost((await params).countryCode, (await params).slug)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta_title || post.title,
    image: post.cover_url ? [cld(post.cover_url, "f_auto,q_auto,w_1200,h_630,c_fill")] : [],
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    mainEntityOfPage: post.canonical_url || `https://www.livingandesstore.com/${(await params).countryCode}/blog/${post.slug}`,
  }

  return (
    // <article className="mx-auto max-w-3xl px-4 py-10">
    //   <h1 className="text-3xl font-semibold mb-3">{post.title}</h1>
    //   {post.published_at && (
    //     <p className="text-sm text-gray-500 mb-6">
    //       {new Date(post.published_at).toLocaleDateString()}
    //     </p>
    //   )}
    //   {post.cover_url && (
    //     <img
    //       src={cld(post.cover_url, "f_auto,q_auto,w_1200")}
    //       alt={post.cover_alt || post.title}
    //       className="mb-6 rounded-xl"
    //     />
    //   )}
    //   {/* <div  className="prose prose-neutral max-w-none" > */}
    //   <div  className="prose prose-neutral md:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content_html ?? "" }}>
        
    //           {/* <Markdown remarkPlugins={[remarkGfm]}>
    //               {post.content_md}
    //           </Markdown> */}
    //           {/* <Suspense fallback={<div>Loading content....</div>} > */}
    //           {/* <MarkdownContent content={post.content_md}/> */}
    //           {/* <MDXRemote source={post.content_md} ></MDXRemote> */}
    //           {/* </Suspense> */}
    //           {/* <Markdown content={post.content_html}/> */}
              
              

    //   </div>

    //   <script
    //     type="application/ld+json"
    //     suppressHydrationWarning
    //     dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    //   />
    // </article>
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-3">{post.title}</h1>

      {post.published_at && (
        <p className="text-sm text-gray-500 mb-6">
          {new Date(post.published_at).toLocaleDateString()}
        </p>
      )}

      {post.cover_url && (
        <img
          src={cld(post.cover_url, "f_auto,q_auto,w_1200")}
          alt={post.cover_alt || post.title}
          className="mb-6 rounded-xl"
          loading="lazy"
        />
      )}
      <pre className="text-xs text-gray-400">
        {post.content_html ? `HTML length: ${post.content_html.length}` : 'No content_html'}
      </pre>
      <div
        className="prose prose-neutral md:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content_html ?? "" }}
      />

      {/* JSON-LD stays as-is */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.meta_title || post.title,
          image: post.cover_url ? [cld(post.cover_url, "f_auto,q_auto,w_1200,h_630,c_fill")] : [],
          datePublished: post.published_at,
          dateModified: post.updated_at || post.published_at,
          mainEntityOfPage: post.canonical_url || `https://www.livingandesstore.com/${(await params).countryCode}/blog/${post.slug}`,
        })}}
      />
    </article>
  )
}
