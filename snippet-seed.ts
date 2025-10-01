import { db } from "@/db";
import { snippets } from "@/db/schema/snippets";
import { GenerateUniqueSlug } from "@/utils/slugify";
import { faker } from "@faker-js/faker";

async function seedSnippets() {
  console.log("🌱 Seeding snippets...");

  for (let i = 0; i < 15; i++) {
    const title = faker.lorem.words({ min: 3, max: 6 });
    const slug = await GenerateUniqueSlug(title, db);

    await db.insert(snippets).values({
      slug,
      title,
      content: faker.lorem.paragraphs({ min: 2, max: 5 }),
    });
  }

  console.log("✅ Snippet seeding complete!");
}

seedSnippets()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Snippet seed failed", err);
    process.exit(1);
  });
