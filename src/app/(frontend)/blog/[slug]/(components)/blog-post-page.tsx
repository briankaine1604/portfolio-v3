import { BlogWithNav } from "@/trpc/routers/_app";
import { format } from "date-fns";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

interface Props {
  post: NonNullable<BlogWithNav>;
}

export default function BlogPostPage({ post }: Props) {
  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to all posts</span>
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
          <time dateTime={post.createdAt.toISOString()}>
            {format(post.createdAt, "MMMM dd, yyyy")}
          </time>
          <span>•</span>
          <span>{post.categoryName}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
            {post.excerpt}
          </p>
        )}

        {/* Divider */}
        <div className="border-b border-gray-200 mb-12" />

        {/* Content */}
        <div
          className="tiptap-content"
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between gap-6">
            {post.prev ? (
              <Link
                href={`/blog/${post.prev.slug}`}
                className="group p-5 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition max-w-[45%] flex-1"
              >
                <p className="text-xs text-gray-500 mb-2">← PREVIOUS</p>
                <h4 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {post.prev.title}
                </h4>
              </Link>
            ) : (
              <div />
            )}

            {post.next && (
              <Link
                href={`/blog/${post.next.slug}`}
                className="group p-5 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition text-right max-w-[45%] flex-1"
              >
                <p className="text-xs text-gray-500 mb-2">NEXT →</p>
                <h4 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {post.next.title}
                </h4>
              </Link>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
