"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white py-5">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 */}
        <div className="space-y-6">
          <h1 className="text-9xl font-light text-slate-900">404</h1>

          <div className="w-16 h-px bg-slate-300 mx-auto" />

          <h2 className="text-2xl md:text-3xl font-light text-slate-900">
            Page Not Found
          </h2>

          <p className="text-lg text-slate-600 font-light max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link
            href="/"
            className="px-8 py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-200"
          >
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 px-8 py-4 border border-slate-200 text-slate-700 rounded-lg font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Suggested Links */}
        <div className="pt-12">
          <p className="text-sm text-slate-500 mb-6">
            Or explore these sections:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/blog"
              className="text-sm px-5 py-2 border border-slate-200 text-slate-700 rounded-full hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/snippets"
              className="text-sm px-5 py-2 border border-slate-200 text-slate-700 rounded-full hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Snippets
            </Link>
            <Link
              href="/contact"
              className="text-sm px-5 py-2 border border-slate-200 text-slate-700 rounded-full hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
