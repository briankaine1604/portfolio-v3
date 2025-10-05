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
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";

// type BlogListItem = Pick<
//   SelectBlog,
//   "id" | "title" | "slug" | "excerpt" | "createdAt"
// >;
// type Props = {
//   posts: BlogListItem[];
// };

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
  const [debouncedSearch] = useDebounce(search, 300); // Debounce the URL state directly
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
    setPage(1); // Reset to first page on new search
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setPage(1); // Reset to first page on new search
  };

  const hasMore = postsData && postsData?.length > limit;
  const posts = hasMore ? postsData?.slice(0, limit) : postsData || [];
  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-y-3 md:grid-cols-3 gap-x-4 items-center">
        <Input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search blogs..."
          className="w-full py-2 border border-gray-300 rounded-lg col-span-2"
        />

        <Select value={categoryId} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full items-center">
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

      <div className="space-y-8">
        {posts &&
          posts.map((post) => (
            <article
              key={post.id}
              className="border-b border-gray-200 pb-6 hover:opacity-90 transition"
              onMouseEnter={async () => {
                queryClient.prefetchQuery(
                  trpc.blog.getOnePublic.queryOptions(post.slug)
                );
              }}
            >
              <h2 className="text-2xl font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-500">
                {format(post.createdAt, "yyyy-MM-dd")}
              </p>
              <p className="mt-2 text-gray-700">{post.excerpt}</p>
            </article>
          ))}
      </div>
      {posts.length > 0 && (
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <Button
            variant={"outline"}
            disabled={!hasMore}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
