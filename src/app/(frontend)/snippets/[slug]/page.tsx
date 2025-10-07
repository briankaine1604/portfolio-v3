import { getQueryClient, trpc } from "@/trpc/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SnippetDetail from "./(components)/snippets-page";

interface Props {
  params: Promise<{ slug: string }>;
}

// ✅ Generate dynamic SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const queryClient = getQueryClient();

  // Try fetching snippet data
  const snippet = await queryClient.fetchQuery(
    trpc.snippet.getOne.queryOptions(slug)
  );

  if (!snippet) {
    return {
      title: "Snippet not found",
      description: "The snippet you’re looking for doesn’t exist.",
    };
  }

  const title = `${snippet.title} | Code Snippets`;
  const description =
    snippet.description ||
    snippet.content.slice(0, 150).replace(/\n/g, " ") + "...";

  const baseUrl = process.env.BASE_URL || "https://yourdomain.com";
  const url = `${baseUrl}/snippets/${snippet.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Code Snippets",
      publishedTime: snippet.createdAt?.toString(),
      modifiedTime: snippet.updatedAt?.toString(),
      locale: "en_US",
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(snippet.title)}`,
          width: 1200,
          height: 630,
          alt: snippet.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/api/og?title=${encodeURIComponent(snippet.title)}`],
    },
  };
}

// ✅ Server Component
export default async function SnippetDetailPage({ params }: Props) {
  const { slug } = await params;
  const queryClient = getQueryClient();
  const snippet = await queryClient.fetchQuery(
    trpc.snippet.getOne.queryOptions(slug)
  );

  if (!snippet) notFound();

  return <SnippetDetail snippet={snippet} />;
}
