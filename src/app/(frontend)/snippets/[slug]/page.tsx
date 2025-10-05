"use client";
import { ArrowLeft, Copy, Check, Calendar, Tag } from "lucide-react";
import { use, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading snippet...</p>
      </div>
    );
  }

  if (!snippet || isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 text-lg">Snippet not found.</p>
        <Link href="/snippets" className="text-blue-600 hover:underline mt-4">
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

  // --- Error or not found state ---

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/snippets"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group mb-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to snippets</span>
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 mb-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {snippet.title}
          </h1>

          {snippet.description && (
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {snippet.description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {snippet.createdAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {/* <div className="flex gap-2">
                {snippet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div> */}
            </div>
          </div>
        </div>

        {/* Code Block */}
        <div className="bg-slate-900 rounded-2xl border-2 border-slate-800 overflow-hidden">
          {/* Code Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm text-slate-400 font-mono">
                {snippet.language}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors text-sm font-medium"
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

          <pre className="p-6 font-mono text-sm leading-relaxed text-slate-300 overflow-x-auto whitespace-pre-wrap">
            <code>{snippet.content}</code>
          </pre>
        </div>

        {/* Usage Section (Optional) */}
        {/* <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Usage Example
          </h3>
          <pre className="bg-white rounded-lg p-4 overflow-x-auto border border-blue-200">
            <code className="text-sm text-slate-800 font-mono">
              {`const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

// debouncedSearch only updates 500ms after user stops typing`}
            </code>
          </pre>
        </div> */}
      </div>
    </div>
  );
}
