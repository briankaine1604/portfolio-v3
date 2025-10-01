"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { ProjectCard } from "./project-card";
import { useDebounce } from "use-debounce";

export function ProjectList() {
  const [page, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: Number,
    serialize: String,
  });
  const [tags, setTags] = useQueryState<string[]>("tags", {
    defaultValue: [],
    parse: (value) => (value ? value.split(",") : []), // When coming out of URL
    serialize: (value) => value && value.join(","), //before entering URL
  });
  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const [debouncedTags] = useDebounce(tags, 300);
  const limit = 10;
  const trpc = useTRPC();
  const { data: projects } = useSuspenseQuery(
    trpc.project.getAll.queryOptions({
      page,
      limit,
      tags: debouncedTags.length > 0 ? debouncedTags : undefined,
    })
  );

  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags))
  ); // to remove duplicates and map Flat

  if (projects.length <= 0)
    return <div className="text-gray-500">No projects found.</div>;
  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                tags.includes(tag)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(({ id, title, description, createdAt, slug, image }) => (
          <ProjectCard
            key={id}
            title={title}
            description={description}
            date={createdAt}
            slug={slug}
            image={image}
          />
        ))}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-between items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium text-gray-700"
        >
          Previous
        </button>

        <button
          disabled={projects.length < limit}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium text-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
