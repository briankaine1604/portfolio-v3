"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTRPC } from "@/trpc/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Search } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";

export default function BlogListCard() {
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
  const [categoryId, setCategoryId] = useQueryState("category", {
    defaultValue: "all",
    parse: String,
    serialize: String,
  });
  const [debouncedSearch] = useDebounce(search, 300);
  const trpc = useTRPC();
  const limit = 10;
  const { data: postsData } = useQuery(
    trpc.blog.getAllPublic.queryOptions({
      page,
      limit,
      search: debouncedSearch,
      categoryId,
    })
  );
  const { data: catData } = useQuery(trpc.category.getAll.queryOptions());
  const queryClient = useQueryClient();

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setPage(1);
  };

  const hasMore = postsData && postsData?.length > limit;
  const posts = hasMore ? postsData?.slice(0, limit) : postsData || [];

  return (
    <div>
      {/* Filters */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search articles..."
            className="pl-11 h-12 border-slate-200 focus:border-slate-300 rounded-lg"
          />
        </div>

        <Select value={categoryId} onValueChange={handleCategoryChange}>
          <SelectTrigger className="h-12 border-slate-200 rounded-lg">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {catData?.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Blog Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-slate-400 mb-4" aria-hidden="true">
            <Search className="w-12 h-12 mx-auto opacity-50" />
          </div>
          <p className="text-slate-600">No posts found</p>
          <p className="text-sm text-slate-500 mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              onMouseEnter={async () => {
                queryClient.prefetchQuery(
                  trpc.blog.getOnePublic.queryOptions(post.slug)
                );
              }}
            >
              <Link href={`/blog/${post.slug}`} className="block space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <time dateTime={post.createdAt.toISOString()}>
                    {format(post.createdAt, "MMM dd, yyyy")}
                  </time>
                </div>

                <h2 className="text-xl font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                <p className="text-slate-600 font-light leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-sm text-slate-500 group-hover:text-slate-900 transition-colors">
                  <span>Read more</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {posts.length > 0 && (
        <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-200">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="h-11 px-6 border-slate-200 hover:bg-slate-50"
          >
            ← Previous
          </Button>

          <span className="text-sm text-slate-500">Page {page}</span>

          <Button
            variant="outline"
            disabled={!hasMore}
            onClick={() => setPage((p) => p + 1)}
            className="h-11 px-6 border-slate-200 hover:bg-slate-50"
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  );
}
