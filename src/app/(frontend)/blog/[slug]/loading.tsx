export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
      </div>
      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-gray-200 animate-pulse rounded" />
          <div className="h-6 w-full bg-gray-200 animate-pulse rounded" />
        </div>
      </article>
    </div>
  );
}
