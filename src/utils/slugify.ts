import { eq } from "drizzle-orm";
import { projects } from "@/db/schema/projects";

export async function GenerateUniqueSlug(title: string, db: any) {
  let slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  let count = 1;

  const baseSlug = slug;

  while (
    (await db.select().from(projects).where(eq(projects.slug, slug))).length > 0
  ) {
    slug = `${baseSlug}-${count++}`;
  }

  return slug;
}
