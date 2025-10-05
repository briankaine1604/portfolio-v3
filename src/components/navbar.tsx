"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-200 group-hover:ring-slate-300 transition-all">
            <Image
              src="/profile.webp"
              alt="Brian Kaine"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <span className="font-medium text-slate-900 hidden sm:block">
            Brian Kaine
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/"
                ? "text-slate-900 bg-slate-100"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            Home
          </Link>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname.includes(href)
                  ? "text-slate-900 bg-slate-100"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 rounded-lg hover:bg-slate-50 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5 text-slate-600" aria-hidden="true" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64 flex flex-col p-6">
              <SheetTitle className="sr-only">Main navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate to different sections of the site
              </SheetDescription>

              {/* Header */}
              <div className="flex items-center gap-3 pb-6 border-b border-slate-200">
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-200">
                  <Image
                    src="/profile.webp"
                    alt="Brian Kaine"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <span className="font-medium text-slate-900">Brian Kaine</span>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-2 mt-6">
                <Link
                  href="/"
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    pathname === "/"
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  Home
                </Link>
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      pathname.includes(href)
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Footer */}
              <div className="mt-auto pt-6 border-t border-slate-200 text-xs text-slate-500">
                © {new Date().getFullYear()} Brian Kaine
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
