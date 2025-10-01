import { InsertProject } from "@/db/schema/projects";
import Link from "next/link";

// components/ProjectCard.jsx
export function ProjectCard({ project }: { project: InsertProject }) {
  return (
    <div className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all">
      <div className="aspect-video bg-slate-100">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-medium text-slate-900">{project.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags &&
            project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-600"
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="flex gap-4 pt-4">
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Live Demo →
            </Link>
          )}
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              GitHub →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
