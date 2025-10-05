import { BlogWithNav } from "@/trpc/routers/_app";
import { format } from "date-fns";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

interface Props {
  post: NonNullable<BlogWithNav>;
}

export default function BlogPostPage({ post }: Props) {
  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Blog</span>
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-8">
          <time dateTime={post.createdAt.toISOString()}>
            {format(post.createdAt, "MMMM dd, yyyy")}
          </time>
          <span aria-hidden="true">•</span>
          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
            {post.categoryName}
          </span>
          <span aria-hidden="true">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-slate-600 mb-12 leading-relaxed font-light">
            {post.excerpt}
          </p>
        )}

        {/* Divider */}
        <div className="w-16 h-px bg-slate-300 mb-12" />

        {/* Content */}
        <div
          className="tiptap-content prose prose-slate prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />

        {/* Bottom Navigation */}
        <div className="mt-20 pt-12 border-t border-slate-200">
          <div className="grid md:grid-cols-2 gap-6">
            {post.prev ? (
              <Link
                href={`/blog/${post.prev.slug}`}
                className="group p-6 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
              >
                <p className="text-xs font-medium text-slate-500 mb-3 tracking-wider uppercase">
                  ← Previous
                </p>
                <h4 className="text-base font-medium text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.prev.title}
                </h4>
              </Link>
            ) : (
              <div />
            )}

            {post.next && (
              <Link
                href={`/blog/${post.next.slug}`}
                className="group p-6 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 text-right"
              >
                <p className="text-xs font-medium text-slate-500 mb-3 tracking-wider uppercase">
                  Next →
                </p>
                <h4 className="text-base font-medium text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.next.title}
                </h4>
              </Link>
            )}
          </div>
        </div>

        {/* Back to Blog CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 rounded-lg font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
          >
            View All Posts
          </Link>
        </div>
      </article>
    </div>
  );
}
