"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
};

const links: NavLink[] = [
  { href: "/blog", label: "Blog" },
  { href: "/snippets", label: "Snippets" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 w-full bg-gradient-to-tr from-gray-100/40 to-white backdrop-blur-md z-50">
      <div className="flex items-center justify-between h-14 py-2  pr-6">
        <div className="items-center h-14 pl-10 flex">
          <Link href="/">
            <img src="/profile.webp" className="size-10 rounded-full" />
          </Link>
        </div>
        <div className="flex items-center justify-end gap-x-6">
          <Link
            href="/"
            className={cn("nav-link", pathname === "/" && "active-link")}
          >
            Home
          </Link>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "nav-link",
                pathname.includes(href) && "active-link"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
