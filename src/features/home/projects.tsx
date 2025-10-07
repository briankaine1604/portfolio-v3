import React, { Suspense } from "react";
import ProjectsList from "./projects-list-home";
import { prefetch, trpc } from "@/trpc/server";

function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-slate-200 h-48 rounded-lg mb-4"></div>
      <div className="space-y-3">
        <div className="h-6 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export default function ProjectsHome() {
  prefetch(trpc.project.getAllPublicHome.queryOptions());
  return (
    <Suspense fallback={<ProjectCardSkeleton />}>
      <ProjectsList />
    </Suspense>
  );
}
