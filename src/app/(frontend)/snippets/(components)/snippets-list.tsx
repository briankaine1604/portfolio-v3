"use client";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";

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
    <section className="min-h-screen px-6 py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-slate-400"></div>
            <p className="text-sm font-medium tracking-wider text-slate-500 uppercase">
              Code Collection
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-slate-900">
            Snippets
          </h1>

          <p className="text-lg text-slate-600 font-light max-w-2xl leading-relaxed">
            Little pieces of code I keep reaching for — shared here so I don't
            forget (and maybe you don't either).
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search snippets..."
              className="pl-11 h-12 border-slate-200 focus:border-slate-300 rounded-lg"
            />
          </div>
        </div>

        {/* Snippets List */}
        {snippets && snippets.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-slate-400 mb-4" aria-hidden="true">
              <Search className="w-12 h-12 mx-auto opacity-50" />
            </div>
            <p className="text-slate-600">No snippets found</p>
            <p className="text-sm text-slate-500 mt-2">
              Try adjusting your search
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {snippets &&
              snippets.map(({ id, title, slug }) => (
                <Link
                  key={id}
                  href={`/snippets/${slug}`}
                  className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                      {title}
                    </h3>
                    <span className="text-slate-400 group-hover:text-slate-900 transition-all group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
