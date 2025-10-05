"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

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

  // Close sheet whenever route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <nav className="fixed top-0 w-full bg-gradient-to-tr from-gray-100/40 to-white backdrop-blur-md z-50">
      <div className="flex items-center justify-between h-14 px-6">
        {/* Logo (always visible, left side) */}
        <Link href="/" className="flex items-center">
          <img src="/profile.webp" className="size-10 rounded-full" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-x-6">
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

        {/* Mobile Nav (hamburger on right) */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64 flex flex-col p-3">
              {/* Accessible title (hidden visually but readable by screen readers) */}
              <SheetTitle className="sr-only">Main navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate to different sections of the site
              </SheetDescription>

              {/* Header */}
              <div className="flex items-center gap-3 py-4 border-b">
                <span className="font-semibold text-lg">Brian Kaine</span>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-y-3 mt-6">
                <Link
                  href="/"
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                    pathname === "/" && "bg-gray-200 font-semibold"
                  )}
                >
                  Home
                </Link>
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                      pathname.includes(href) && "bg-gray-200 font-semibold"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Footer (optional) */}
              <div className="mt-auto border-t pt-4 text-xs text-gray-500">
                © {new Date().getFullYear()} Brian Kaine
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
