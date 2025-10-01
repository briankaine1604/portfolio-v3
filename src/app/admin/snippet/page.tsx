import { prefetch, trpc } from "@/trpc/server";
import Link from "next/link";
import { Suspense } from "react";
import { SnippetList } from "./(components)/snippet-list";

export default function SnippetAdmin() {
  const page = 1; // default page
  const limit = 10;
  prefetch(trpc.snippet.getAll.queryOptions({ page, limit }));

  return (
    <div className="min-h-screen flex flex-col gap-6 p-6">
      {/* Page Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Snippets</h1>
        <Link
          href="/admin/snippet/new"
          className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800 transition"
        >
          + New Snippet
        </Link>
      </header>

      {/* Content */}
      <section>
        <Suspense
          fallback={<div className="text-gray-500">Loading snippets...</div>}
        >
          <SnippetList />
        </Suspense>
      </section>
    </div>
  );
}
