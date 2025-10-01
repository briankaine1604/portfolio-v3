"use client";
import type { Project } from "@/types";
import { ProjectCard } from "./project-card";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function Projects() {
  const trpc = useTRPC();
  const { data: projects, isLoading } = useQuery(
    trpc.project.getAllPublicHome.queryOptions()
  );
  return (
    <section
      id="projects"
      className="py-20 px-6 md:px-8 border-t border-slate-100 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900">
            Selected Work
          </h2>
          <p className="text-lg text-slate-600 font-light">
            A few projects I’ve worked on recently — blending design, code, and
            modern web technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects &&
            projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
        </div>
      </div>
    </section>
  );
}
