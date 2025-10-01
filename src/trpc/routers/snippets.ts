import { baseProcedure, createTRPCRouter } from "../init";
import z from "zod";
import { and, desc, eq, ilike } from "drizzle-orm";
import { GenerateUniqueSlug } from "@/utils/slugify";
import { insertSnippetSchema, snippets } from "@/db/schema/snippets";

export const snippetRouter = createTRPCRouter({
  getAll: baseProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(10),
      })
    )
    .query(({ ctx, input }) => {
      const { page, limit } = input;
      const offset = (page - 1) * limit;
      const result = ctx.db
        .select()
        .from(snippets)
        .limit(limit + 1)
        .offset(offset)
        .orderBy(desc(snippets.createdAt));
      return result;
    }),
  getOne: baseProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const result = await ctx.db
      .select()
      .from(snippets)
      .where(eq(snippets.slug, input));
    return result[0];
  }),
  create: baseProcedure
    .input(insertSnippetSchema.omit({ slug: true }))
    .mutation(async ({ ctx, input }) => {
      const slug = await GenerateUniqueSlug(input.title, ctx.db);
      const result = await ctx.db.insert(snippets).values({
        ...input,
        slug,
      });
      return result;
    }),
  edit: baseProcedure
    .input(
      z.object({
        data: insertSnippetSchema.omit({ slug: true }),
        slug: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .update(snippets)
        .set(input.data)
        .where(eq(snippets.slug, input.slug))
        .returning();
      return result[0];
    }),
  delete: baseProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const result = await ctx.db
      .delete(snippets)
      .where(eq(snippets.slug, input))
      .returning();
    return result;
  }),
  getAllPublic: baseProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(10),
        search: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      const { page, limit, search } = input;
      let conditions = [];
      if (search) {
        conditions.push(ilike(snippets.title, `%${input.search}%`));
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const offset = (page - 1) * limit;
      const result = ctx.db
        .select({
          id: snippets.id,
          slug: snippets.slug,
          title: snippets.title,
          createdAt: snippets.createdAt,
        })
        .from(snippets)
        .limit(limit + 1)
        .offset(offset)
        .where(where)
        .orderBy(desc(snippets.createdAt));
      return result;
    }),
});
