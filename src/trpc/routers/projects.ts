import { insertProjectSchema, projects } from "@/db/schema/projects";
import { GenerateUniqueSlug } from "@/utils/slugify";
import { and, arrayContains, desc, eq, sql } from "drizzle-orm";
import z from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

export const projectsRouter = createTRPCRouter({
  getAll: baseProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(10),
        tags: z.array(z.string()).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, tags } = input;
      const offset = (page - 1) * limit;
      const conditions: any[] = [];

      if (tags && tags.length > 0) {
        // For JSON columns, use SQL jsonb operator
        tags.forEach((tag) => {
          conditions.push(
            sql`${projects.tags}::jsonb @> ${JSON.stringify([tag])}::jsonb`
          );
        });
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;
      return await ctx.db
        .select()
        .from(projects)
        .where(where)
        .limit(limit + 1)
        .offset(offset)
        .orderBy(desc(projects.createdAt));
    }),
  getOne: baseProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const result = await ctx.db
      .select()
      .from(projects)
      .where(eq(projects.slug, input));
    return result[0];
  }),
  create: baseProcedure
    .input(insertProjectSchema.omit({ slug: true }))
    .mutation(async ({ ctx, input }) => {
      try {
        const slug = await GenerateUniqueSlug(input.title, ctx.db);
        console.log("Generated slug:", slug);
        const result = await ctx.db.insert(projects).values({
          ...input,
          slug,
        });
        console.log("Insert result:", result);
        return result;
      } catch (error) {
        console.error("Error in create mutation:", error);
        throw error;
      }
    }),
  edit: baseProcedure
    .input(
      z.object({
        slug: z.string(),
        data: insertProjectSchema.omit({ slug: true }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .update(projects)
        .set(input.data)
        .where(eq(projects.slug, input.slug))
        .returning();
      return result[0];
    }),
  delete: baseProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const result = await ctx.db
      .delete(projects)
      .where(eq(projects.slug, input))
      .returning();
    return result;
  }),
  getAllPublicHome: baseProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(projects)
      .orderBy(desc(projects.priority), desc(projects.createdAt))
      .limit(5);
  }),
});
