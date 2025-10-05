// src/routes/snippets.tsx

import { prefetch, trpc } from "@/trpc/server";
import SnippetListPublic from "./(components)/snippets-list";
import { Suspense } from "react";

export default function SnippetsPage() {
  prefetch(trpc.snippet.getAllPublic.queryOptions({ page: 1, limit: 10 }));
  return (
    <Suspense
      fallback={
        <section className="min-h-screen px-6 py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-slate-500">Loading snippets...</p>
          </div>
        </section>
      }
    >
      <SnippetListPublic />
    </Suspense>
  );
}
