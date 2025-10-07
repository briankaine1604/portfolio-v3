import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ProjectList } from "./(components)/project-list";
import Link from "next/link";

export default function ProjectsAdmin() {
  const page = 1; // default page
  const limit = 10;

  prefetch(trpc.project.getAll.queryOptions({ page, limit }));

  return (
    <div className="min-h-screen flex flex-col gap-6 p-6">
      {/* Page Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800 transition"
        >
          + New Project
        </Link>
      </header>

      {/* Content */}
      <section>
        <HydrateClient>
          <Suspense
            fallback={<div className="text-gray-500">Loading projects...</div>}
          >
            <ProjectList />
          </Suspense>
        </HydrateClient>
      </section>
    </div>
  );
}
