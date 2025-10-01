import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params }: Props) => {
  const slug = (await params).slug;
  console.log("slug:", slug);
  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      Blog-&gt;{slug}
      <div>Hello</div>
    </div>
  );
};

export default Page;
