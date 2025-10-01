// components/BlogList.tsx
"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query"; // Changed from useSuspenseQuery
import { useQueryState } from "nuqs";
import { BlogCard } from "./blog-card";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BlogList() {
  const [page, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: Number,
    serialize: String,
  });

  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    parse: String,
    serialize: String,
  });

  const [categoryId, setCategoryId] = useQueryState("category", {
    defaultValue: "all",
    parse: String,
    serialize: String,
  });

  const [debouncedSearch] = useDebounce(search, 300); // Debounce the URL state directly

  const limit = 10;
  const trpc = useTRPC();

  const {
    data: blogsData,
    isLoading,
    isFetching,
  } = useQuery(
    trpc.blog.getAll.queryOptions({
      page,
      limit,
      search: debouncedSearch,
      categoryId,
    })
  );

  const {
    data: catData,
    isLoading: catLoading,
    isFetching: catFetching,
  } = useQuery(trpc.category.getAll.queryOptions());

  const hasMore = blogsData && blogsData.length > limit;
  const blogs = hasMore ? blogsData.slice(0, limit) : blogsData || [];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Reset page immediately when search changes
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative col-span-2">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search blogs..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {isFetching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="size-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            </div>
          )}
        </div>
        <div>
          <Select value={categoryId} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Category ....." />
            </SelectTrigger>
            <SelectContent>
              {/* Reset option */}
              <SelectItem value="all">All</SelectItem>

              {/* Real categories */}
              {catData?.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Blog cards grid */}
      {isLoading ? (
        <div className="text-gray-500">Loading...</div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(({ id, title, excerpt, createdAt, slug }) => (
            <BlogCard
              key={id}
              title={title}
              excerpt={excerpt}
              date={createdAt}
              slug={slug}
            />
          ))}
        </div>
      ) : (
        <div className="text-gray-500">No Blogs found.</div>
      )}

      {/* Pagination */}
      {blogs.length > 0 && (
        <div className="flex justify-between items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium text-gray-700"
          >
            Previous
          </button>

          <button
            disabled={!hasMore}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium text-gray-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
