 "use client"
// components/MarkdownContent.tsx
//@ts-ignore
import { MDXRemote } from 'next-mdx-remote/rsc'

interface MarkdownContentProps {
  content: string
}

export  default function MarkdownContent({ content }: MarkdownContentProps) {
  return <MDXRemote source={content} />
}

// import { MDXRemote } from "next-mdx-remote/rsc"
// import type { MDXComponents } from "mdx/types"

// const components: MDXComponents = {
//   a: (props) => (
//     <a {...props} className="underline" target="_blank" rel="noopener noreferrer" />
//   ),
//   img: (props) => <img {...props} loading="lazy" className="rounded-lg" />,
// }

// export default async function MarkdownContent({ content }: { content: string }) {
//   const [remarkGfm, rehypeSlug, rehypeAutolinkHeadings] = await Promise.all([
//     import("remark-gfm").then(m => m.default),
//     import("rehype-slug").then(m => m.default),
//     import("rehype-autolink-headings").then(m => m.default),
//   ])

//   // Server-only render
//   return (
//     <MDXRemote
//       source={content}
//       components={components}
//       options={{
//         mdxOptions: {
//           remarkPlugins: [remarkGfm],
//           rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
//         },
//       }}
//     />
//   )
// }


