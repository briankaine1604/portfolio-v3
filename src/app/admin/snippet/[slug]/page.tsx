import { prefetch, trpc } from "@/trpc/server";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { EditSnippetForm } from "../(components)/edit-snippet-form";

type Props = {
  params: Promise<{ slug: string }>;
};

async function page({ params }: Props) {
  const slug = (await params).slug;
  prefetch(trpc.snippet.getOne.queryOptions(slug));
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/projects">Snippets</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <EditSnippetForm slug={slug} />
    </div>
  );
}

export default page;
