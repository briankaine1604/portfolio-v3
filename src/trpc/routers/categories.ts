import { categories, insertCategorySchema } from "@/db/schema/categories";
import { GenerateUniqueSlug } from "@/utils/slugify";
import { eq } from "drizzle-orm";
import z from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

export const categoriesRouter = createTRPCRouter({
  getAll: baseProcedure.query(({ ctx }) => {
    const result = ctx.db.select().from(categories);
    return result;
  }),
  getOne: baseProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const result = await ctx.db
      .select()
      .from(categories)
      .where(eq(categories.slug, input));
    return result[0];
  }),
  create: baseProcedure
    .input(insertCategorySchema.omit({ slug: true }))
    .mutation(async ({ ctx, input }) => {
      const slug = await GenerateUniqueSlug(input.name, ctx.db);
      const result = await ctx.db.insert(categories).values({
        ...input,
        slug,
      });
      return result;
    }),
  edit: baseProcedure
    .input(
      z.object({
        data: insertCategorySchema.omit({ slug: true }),
        slug: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .update(categories)
        .set(input.data)
        .where(eq(categories.slug, input.slug))
        .returning();
      return result[0];
    }),
});
