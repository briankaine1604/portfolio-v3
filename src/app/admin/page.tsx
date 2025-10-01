import Link from "next/link";

export default function AdminLanding() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p className="text-gray-600 mb-8">
        Welcome back 👋 Select a section to manage your portfolio content.
      </p>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
        <Link
          href="/admin/projects"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-gray-500 text-sm">
            Add, edit, or remove your portfolio projects.
          </p>
        </Link>

        <Link
          href="/admin/blog"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Blog</h2>
          <p className="text-gray-500 text-sm">
            Manage your blog posts and drafts.
          </p>
        </Link>

        <Link
          href="/admin/snippet"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Snippets</h2>
          <p className="text-gray-500 text-sm">
            Save and update code snippets or notes.
          </p>
        </Link>
      </div>
    </main>
  );
}
