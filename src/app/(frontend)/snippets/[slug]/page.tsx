"use client";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { use, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { format } from "date-fns";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function SnippetDetailPage({ params }: Props) {
  const { slug } = use(params);
  const [copied, setCopied] = useState(false);
  const trpc = useTRPC();
  const {
    data: snippet,
    isLoading,
    isFetching,
    isError,
  } = useQuery(trpc.snippet.getOne.queryOptions(slug));

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-slate-600">Loading snippet...</p>
      </div>
    );
  }

  if (!snippet || isError) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-slate-600 mb-4">Snippet not found</p>
        <Link
          href="/snippets"
          className="text-slate-900 hover:text-blue-600 transition-colors underline"
        >
          Back to snippets
        </Link>
      </div>
    );
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/snippets"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group mb-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Snippets</span>
        </Link>

        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <time dateTime={snippet.createdAt.toISOString()}>
              {format(snippet.createdAt, "MMM dd, yyyy")}
            </time>
            <span aria-hidden="true">•</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
              {snippet.language}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-slate-900">
            {snippet.title}
          </h1>

          {snippet.description && (
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              {snippet.description}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-slate-300 mb-8" />

        {/* Code Block */}
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
          {/* Code Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-sm text-slate-400 font-mono">
                {snippet.language}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors text-sm font-medium"
              aria-label={
                copied ? "Copied to clipboard" : "Copy code to clipboard"
              }
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Code Content */}
          <pre className="p-6 font-mono text-sm leading-relaxed text-slate-300 overflow-x-auto">
            <code>{snippet.content}</code>
          </pre>
        </div>

        {/* Back to All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/snippets"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 rounded-lg font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
          >
            View All Snippets
          </Link>
        </div>
      </div>
    </div>
  );
}
