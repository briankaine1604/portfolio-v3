import { prefetch, trpc } from "@/trpc/server";
import BlogListCard from "./[slug]/(components)/blog-list-card";
import { Suspense } from "react";

function BlogLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse p-6 bg-white rounded-xl border border-slate-200"
        >
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BlogPage() {
  prefetch(trpc.blog.getAllPublic.queryOptions({ page: 1, limit: 10 }));

  return (
    <section className="min-h-screen px-6 py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-slate-400"></div>
            <p className="text-sm font-medium tracking-wider text-slate-500 uppercase">
              Writing
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-slate-900">
            Blog
          </h1>

          <p className="text-lg text-slate-600 font-light max-w-2xl leading-relaxed">
            Thoughts, lessons, and experiments from my journey in web
            development — from TypeScript tips to building with AI, and
            everything in between.
          </p>
        </div>

        {/* Blog posts */}
        <Suspense fallback={<BlogLoadingSkeleton />}>
          <BlogListCard />
        </Suspense>
      </div>
    </section>
  );
}
