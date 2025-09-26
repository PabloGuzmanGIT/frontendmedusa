// src/lib/markdown.ts
"use client"
// components/Markdown.tsx
import React from "react"
//@ts-ignore
import ReactMarkdown from "react-markdown"
//@ts-ignore
import remarkGfm from "remark-gfm"
//@ts-ignore
import rehypeSlug from "rehype-slug"
//@ts-ignore
import rehypeAutolinkHeadings from "rehype-autolink-headings"
//@ts-ignore
import rehypeSanitize from "rehype-sanitize"
//@ts-ignore
import rehypePrettyCode from "rehype-pretty-code"
import Image from "next/image"
//@ts-ignore
import rehypeHighlight from "rehype-highlight"


export default function Markdown({ content }: { content: string }) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          rehypeHighlight,     // <-- sync, no more runSync error
          rehypeSanitize,
        ]}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}

