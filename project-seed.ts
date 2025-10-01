import { db } from "@/db";
import { projects } from "@/db/schema/projects";
import { GenerateUniqueSlug } from "@/utils/slugify";
import { faker } from "@faker-js/faker";
// same slug util you use in create

async function seed() {
  console.log("🌱 Seeding projects...");

  for (let i = 0; i < 10; i++) {
    const title = faker.commerce.productName();
    const slug = await GenerateUniqueSlug(title, db);

    await db.insert(projects).values({
      slug,
      title,
      description: faker.commerce.productDescription(),
      image: faker.image.urlPicsumPhotos({ width: 800, height: 600 }),
      tags: faker.helpers.arrayElements(
        ["nextjs", "react", "drizzle", "tailwind", "trpc", "gsap", "postgres"],
        { min: 2, max: 5 }
      ),
      demo: faker.internet.url(),
      github: `https://github.com/${faker.internet.displayName()}/${faker.word.noun()}`,
    });
  }

  console.log("✅ Seed complete!");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed", err);
    process.exit(1);
  });
