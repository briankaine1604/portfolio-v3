"use client";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-50 to-slate-100 pt-14 pb-5">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-500 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-blue-400 to-slate-400 animate-pulse" />
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-slate-600 mb-12 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </a>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all border border-slate-200 hover:border-slate-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Suggested Links */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/blog"
              className="text-sm px-4 py-2 bg-white rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Blog
            </a>
            <a
              href="/projects"
              className="text-sm px-4 py-2 bg-white rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Projects
            </a>
            <a
              href="/contact"
              className="text-sm px-4 py-2 bg-white rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
