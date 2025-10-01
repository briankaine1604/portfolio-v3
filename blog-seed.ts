import { db } from "@/db";
import { blogs } from "@/db/schema/blogs";
import { categories } from "@/db/schema/categories";
import { GenerateUniqueSlug } from "@/utils/slugify";
import { faker } from "@faker-js/faker";

async function seedBlogs() {
  console.log("🌱 Seeding blogs...");

  // Fetch available categories
  const allCategories = await db.select().from(categories);

  if (allCategories.length === 0) {
    throw new Error("❌ No categories found. Seed categories first!");
  }

  for (let i = 0; i < 10; i++) {
    const title = faker.lorem.sentence({ min: 3, max: 6 });
    const slug = await GenerateUniqueSlug(title, db);

    const category = faker.helpers.arrayElement(allCategories); // random category assignment

    await db.insert(blogs).values({
      slug,
      title,
      content: faker.lorem.paragraphs({ min: 3, max: 6 }),
      excerpt: faker.lorem.sentences(2),
      categoryId: category.id,
    });
  }

  console.log("✅ Blog seeding complete!");
}

seedBlogs()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Blog seed failed", err);
    process.exit(1);
  });
