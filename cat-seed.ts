import { db } from "@/db";
import { categories } from "@/db/schema/categories";
import { GenerateUniqueSlug } from "@/utils/slugify";

async function seedCategories() {
  console.log("🌱 Seeding categories...");

  const names = [
    "Technology",
    "Business",
    "Lifestyle",
    "Design",
    "Programming",
    "Startups",
    "Marketing",
    "Productivity",
  ];

  for (const name of names) {
    const slug = await GenerateUniqueSlug(name, db);

    await db.insert(categories).values({
      name,
      slug,
    });
  }

  console.log("✅ Categories seeded!");
}

seedCategories()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Category seed failed", err);
    process.exit(1);
  });
