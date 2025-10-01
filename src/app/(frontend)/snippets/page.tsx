// src/routes/snippets.tsx

import { prefetch, trpc } from "@/trpc/server";
import Link from "next/link";
import SnippetListPublic from "./(components)/snippets-list";

export default function SnippetsPage() {
  prefetch(trpc.snippet.getAllPublic.queryOptions({ page: 1, limit: 10 }));
  return (
    <section className="py-20 px-6 md:px-8 min-h-screen">
      <SnippetListPublic />
    </section>
  );
}
