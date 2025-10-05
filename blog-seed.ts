import { db } from "@/db";
import { blogs } from "@/db/schema/blogs";
import { categories } from "@/db/schema/categories";
import { GenerateUniqueSlug } from "@/utils/slugify";
import { faker } from "@faker-js/faker";

async function seedBlogs() {
  // await db.delete(blogs); // Add this at the start of seedBlogs()
  console.log("🌱 Seeding blogs...");

  // Fetch available categories
  const allCategories = await db.select().from(categories);

  if (allCategories.length === 0) {
    throw new Error("❌ No categories found. Seed categories first!");
  }

  // Create a base date (e.g., 30 days ago)
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - 30);

  const blogPosts = [];

  for (let i = 0; i < 10; i++) {
    const title = faker.lorem.sentence({ min: 3, max: 6 });
    const slug = await GenerateUniqueSlug(title, db);
    const category = faker.helpers.arrayElement(allCategories);

    // Create timestamps 3 days apart to ensure uniqueness
    const createdAt = new Date(baseDate);
    createdAt.setDate(createdAt.getDate() + i * 3);

    blogPosts.push({
      slug,
      title,
      content: faker.lorem.paragraphs({ min: 3, max: 6 }),
      excerpt: faker.lorem.sentences(2),
      categoryId: category.id,
      createdAt,
    });
  }

  // Insert all at once (optional: could insert one by one)
  for (const post of blogPosts) {
    await db.insert(blogs).values(post);
    console.log(
      `✅ Created: "${post.title}" (${post.createdAt.toISOString()})`
    );
  }

  console.log("\n📊 Blog Timeline:");
  console.log("════════════════════════════════════════");
  blogPosts.forEach((post, idx) => {
    console.log(`${idx + 1}. ${post.title.slice(0, 40)}...`);
    console.log(`   Slug: ${post.slug}`);
    console.log(`   Date: ${post.createdAt.toLocaleDateString()}\n`);
  });

  console.log("✅ Blog seeding complete!");
  console.log(`📝 Total posts created: ${blogPosts.length}`);
  console.log("\n💡 Posts are ordered chronologically (oldest → newest)");
  console.log("   Test navigation by visiting any post slug!");
}

seedBlogs()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Blog seed failed", err);
    process.exit(1);
  });
