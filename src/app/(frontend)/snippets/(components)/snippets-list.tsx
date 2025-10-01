"use client";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";

type Props = {};

export default function SnippetListPublic({}: Props) {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    parse: String,
    serialize: String,
  });
  const [page, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: Number,
    serialize: String,
  });
  const trpc = useTRPC();
  const limit = 10;
  const [debouncedSearch] = useDebounce(search, 300);
  const { data: snippets } = useQuery(
    trpc.snippet.getAllPublic.queryOptions({
      page,
      limit,
      search: debouncedSearch,
    })
  );
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-light text-slate-900">Code Snippets</h2>
        <p className="text-slate-600 mt-3">
          Little pieces of code I keep reaching for — shared here so I don’t
          forget (and maybe you don’t either).
        </p>
      </div>
      <div className="mb-8 w-1/2 mx-auto">
        <Input
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search snippets..."
          className="w-full"
        />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {snippets &&
          snippets.map(({ id, title, slug }) => (
            <Link
              key={id}
              href={`/snippets/${slug}`}
              className="block p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition"
            >
              <h3 className="text-lg font-medium text-slate-900">{title}</h3>
            </Link>
          ))}
      </div>
    </div>
  );
}
