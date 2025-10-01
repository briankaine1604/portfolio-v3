import { prefetch, trpc } from "@/trpc/server";
import Link from "next/link";
import BlogListCard from "./[slug]/(components)/blog-list-card";

export default function BlogPage() {
  prefetch(trpc.blog.getAllPublic.queryOptions({ page: 1, limit: 10 }));
  return (
    <section className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Blog</h1>
        <p className="mt-4 text-lg text-slate-600 font-light">
          Thoughts, lessons, and experiments from my journey in web development
          — from TypeScript tips to building with AI, and everything in between.
        </p>
      </div>

      {/* Blog posts */}
      <BlogListCard />
    </section>
  );
}
