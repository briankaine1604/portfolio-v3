// src/components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        {/* Left side */}
        <p>© {new Date().getFullYear()} Brian Ikeogu. All rights reserved.</p>

        {/* Right side */}
        <nav className="flex gap-6">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <Link href="/blog" className="hover:text-gray-900 transition-colors">
            Blog
          </Link>
          <Link
            href="/snippets"
            className="hover:text-gray-900 transition-colors"
          >
            Snippets
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-900 transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
