"use client";

import { InsertProject } from "@/db/schema/projects";
import Link from "next/link";
import { useState } from "react";

export function ProjectCard({ project }: { project: InsertProject }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  const shouldTruncate = project.description.length > maxLength;

  const displayDescription =
    !isExpanded && shouldTruncate
      ? project.description.slice(0, maxLength) + "..."
      : project.description;

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-slate-200/60 bg-white shadow-sm hover:border-slate-300/60 transition-all duration-300">
      {/* Image with overlay gradient on hover */}
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0" />
      </div>

      {/* Content with subtle gradient background on hover */}
      <div className="relative p-6 space-y-3 bg-gradient-to-br from-white to-white group-hover:from-slate-50/50 group-hover:to-blue-50/20 transition-all duration-300">
        <h3 className="text-xl font-semibold text-slate-900 group-hover:text-slate-950">
          {project.title}
        </h3>

        <div className="text-slate-600 text-sm leading-relaxed">
          <p className="transition-colors duration-200 group-hover:text-slate-700">
            {displayDescription}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-700 font-medium transition-all hover:gap-2"
            >
              {isExpanded ? "Show less ↑" : "Read more ↓"}
            </button>
          )}
        </div>

        {/* Enhanced tags with hover effects */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags &&
            project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* Enhanced links with border separator */}
        <div className="flex gap-4 pt-4 border-t border-slate-100">
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:gap-2 transition-all"
            >
              Live Demo →
            </Link>
          )}
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:gap-2 transition-all"
            >
              GitHub →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
