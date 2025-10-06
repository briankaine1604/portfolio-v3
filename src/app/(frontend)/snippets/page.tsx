// src/routes/snippets.tsx

import { prefetch, trpc } from "@/trpc/server";
import SnippetListPublic from "./(components)/snippets-list";
import { Suspense } from "react";

export default function SnippetsPage() {
  prefetch(
    trpc.snippet.getAllPublic.queryOptions({ page: 1, limit: 10, search: "" })
  );
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse p-6 bg-white border border-slate-200 rounded-xl"
            >
              <div className="h-5 bg-slate-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      }
    >
      <SnippetListPublic />
    </Suspense>
  );
}
