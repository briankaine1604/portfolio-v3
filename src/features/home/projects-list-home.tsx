"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";

// Empty state component
function EmptyProjects() {
  return (
    <div className="text-center py-20">
      <div className="max-w-md mx-auto space-y-4">
        <div className="text-6xl text-slate-300" aria-hidden="true">
          📦
        </div>
        <h3 className="text-xl font-medium text-slate-900">No projects yet</h3>
        <p className="text-slate-600">
          Check back soon for new projects and work samples.
        </p>
      </div>
    </div>
  );
}

export default function ProjectsList() {
  const trpc = useTRPC();
  const { data: projects, isLoading } = useQuery(
    trpc.project.getAllPublicHome.queryOptions()
  );

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-8 border-t border-slate-200 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900">
            Selected Work
          </h2>
          <p className="text-lg text-slate-600 font-light">
            A few projects I've worked on recently — blending design, code, and
            modern web technologies.
          </p>
        </div>

        {/* Projects Grid with Loading and Empty States */}
        {!projects || projects.length === 0 ? (
          <EmptyProjects />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, idx) => (
              <ProjectCard key={project.id || idx} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
