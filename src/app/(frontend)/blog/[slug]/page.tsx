import { Metadata } from "next";
import { getQueryClient, trpc } from "@/trpc/server";
import { notFound } from "next/navigation";
import BlogPostPage from "./(components)/blog-post-page";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

// Dynamic metadata generator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const queryClient = getQueryClient();
  const post = await queryClient.fetchQuery(
    trpc.blog.getOnePublic.queryOptions(slug)
  );

  if (!post) {
    return {
      title: "Post not found",
      description: "This post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt ?? "",
    openGraph: {
      title: post.title,
      description: post.excerpt ?? "",
      type: "article",
      url: `${process.env.BASE_URL}/${post.slug}`,
      publishedTime: post.createdAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? "",
    },
  };
}

const BlogPage = async ({ params }: Props) => {
  const { slug } = await params;
  const queryClient = getQueryClient();
  const post = await queryClient.fetchQuery(
    trpc.blog.getOnePublic.queryOptions(slug)
  );

  if (!post) {
    notFound(); // Shows Next.js 404 page
  }

  return <BlogPostPage post={post} />;
};

export default BlogPage;
