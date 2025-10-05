"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { SnippetCard } from "./snippet-card";
import { Button } from "@/components/ui/button";

export function SnippetList() {
  const [page, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: Number,
    serialize: String,
  });
  const limit = 10;
  const trpc = useTRPC();
  const { data: snippets } = useSuspenseQuery(
    trpc.snippet.getAll.queryOptions({ page, limit })
  );

  if (snippets.length <= 0)
    return <div className="text-gray-500">No Snippet found.</div>;
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {snippets.map(({ id, title, createdAt, slug }) => (
          <SnippetCard key={id} title={title} date={createdAt} slug={slug} />
        ))}
      </div>

      <div className="flex justify-between mt-auto px-6 py-4">
        <Button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          variant={"outline"}
        >
          Previous
        </Button>
        <Button
          disabled={snippets.length < limit}
          onClick={() => setPage((p) => p + 1)}
          variant={"outline"}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
