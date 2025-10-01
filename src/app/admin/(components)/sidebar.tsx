"use client";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  const pathName = usePathname();
  const routes = [
    { name: "Dashboard", path: "/admin" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Blog Posts", path: "/admin/blog" },
    { name: "Snippets", path: "/admin/snippet" },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col justify-between bg-white border-r border-gray-200 p-6 w-64 min-h-screen",
        className
      )}
    >
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between h-14">
          <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
          <Link href="/">
            <img
              src="/profile.webp"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>
        </div>

        <nav className="flex flex-col gap-1 mt-6">
          {routes.map((route) => {
            const isActive =
              route.path === "/admin"
                ? pathName === route.path // exact match for dashboard
                : pathName.startsWith(route.path); // startsWith for others

            return (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm font-medium",
                  isActive && "bg-gray-100 text-gray-900"
                )}
              >
                {route.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mt-4">
        <Link
          href="/"
          className="block w-full text-center bg-gray-100 text-gray-900 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </aside>
  );
};
