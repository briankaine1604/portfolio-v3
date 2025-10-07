import { db } from "@/db";
import { snippets } from "@/db/schema/snippets";
import { GenerateUniqueSlug } from "@/utils/slugify";
import { faker } from "@faker-js/faker";

async function seedSnippets() {
  console.log("🌱 Seeding snippets...");

  const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Go",
    "C++",
    "Rust",
    "SQL",
    "HTML",
    "CSS",
  ];

  for (let i = 0; i < 15; i++) {
    const title = faker.lorem.words({ min: 3, max: 6 });
    const slug = await GenerateUniqueSlug(title, db);
    const language = faker.helpers.arrayElement(languages);

    // Spread createdAt dates across the last 60 days with random time offsets
    const daysAgo = faker.number.int({ min: 1, max: 60 });
    const randomHours = faker.number.int({ min: 0, max: 23 });
    const randomMinutes = faker.number.int({ min: 0, max: 59 });
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);
    createdAt.setHours(randomHours, randomMinutes, 0, 0);

    await db.insert(snippets).values({
      slug,
      title,
      description: faker.lorem.sentence({ min: 6, max: 12 }),
      language,
      content: faker.lorem.paragraphs({ min: 3, max: 6 }, "\n\n"),
      createdAt,
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
