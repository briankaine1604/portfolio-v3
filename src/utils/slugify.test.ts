// src/utils/GenerateUniqueSlug.test.ts
import { GenerateUniqueSlug } from "./slugify";

/**
 * Fake db that simulates existing slugs.
 */
function createFakeDb(nonEmptyCalls = 0) {
  let calls = 0;
  return {
    select() {
      return {
        from() {
          return {
            where() {
              calls++;
              if (calls <= nonEmptyCalls) {
                // Pretend slug exists
                return Promise.resolve([{ id: "exists" }]);
              }
              // No match => slug available
              return Promise.resolve([]);
            },
          };
        },
      };
    },
  };
}

describe("GenerateUniqueSlug", () => {
  it("creates a clean slug from title", async () => {
    const db = createFakeDb(0);
    const slug = await GenerateUniqueSlug("Hello, World!", db);
    expect(slug).toBe("hello-world");
  });

  it("appends -1 when slug already exists", async () => {
    const db = createFakeDb(1);
    const slug = await GenerateUniqueSlug("Hello World!", db);
    expect(slug).toBe("hello-world-1");
  });

  it("handles multiple duplicates correctly", async () => {
    const db = createFakeDb(2);
    const slug = await GenerateUniqueSlug("Hello World!", db);
    // If you’ve updated the function to use base + count, expect hello-world-2
    expect(slug).toBe("hello-world-2");
  });
});
