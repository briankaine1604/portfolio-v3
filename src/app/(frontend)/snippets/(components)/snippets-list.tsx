"use client";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { Code2, Search, Sparkles } from "lucide-react";

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
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6">
          <Code2 className="w-4 h-4" />
          <span>Code Collection</span>
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Code Snippets
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Little pieces of code I keep reaching for — shared here so I don't
          forget (and maybe you don't either).
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-12 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search snippets..."
            className="w-full pl-12 py-6 text-lg border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {/* Snippets Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {snippets &&
          snippets.map(({ id, title, slug }, index) => (
            <Link
              key={id}
              href={`/snippets/${slug}`}
              className="group relative p-8 bg-white rounded-2xl border-2 border-slate-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-white flex items-center justify-center transition-colors">
                    <Code2 className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <Sparkles className="w-5 h-5 text-slate-300 group-hover:text-blue-400 transition-colors" />
                </div>

                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {title}
                </h3>

                <div className="mt-4 flex items-center text-sm text-slate-500 group-hover:text-slate-700">
                  <span>View snippet</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
      </div>

      {/* Empty State */}
      {snippets && snippets.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
            <Search className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No snippets found
          </h3>
          <p className="text-slate-600">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}
