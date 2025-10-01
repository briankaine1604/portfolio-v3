import { blogs, insertBlogSchema } from "@/db/schema/blogs";
import { baseProcedure, createTRPCRouter } from "../init";
import z from "zod";
import { and, desc, eq, ilike } from "drizzle-orm";
import { GenerateUniqueSlug } from "@/utils/slugify";
import { title } from "process";

export const blogRouter = createTRPCRouter({
  getAll: baseProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(10),
        search: z.string().optional(),
        categoryId: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      const { page, limit, search, categoryId } = input;
      const offset = (page - 1) * limit;
      let conditions = [];
      if (search) {
        conditions.push(ilike(blogs.title, `%${input.search}%`));
      }
      if (categoryId && categoryId !== "all") {
        conditions.push(eq(blogs.categoryId, categoryId));
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const result = ctx.db
        .select()
        .from(blogs)
        .where(where)
        .limit(limit + 1)
        .offset(offset)
        .orderBy(desc(blogs.createdAt));

      return result;
    }),
  getOne: baseProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const result = await ctx.db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, input));
    return result[0];
  }),
  create: baseProcedure
    .input(insertBlogSchema.omit({ slug: true }))
    .mutation(async ({ ctx, input }) => {
      const slug = await GenerateUniqueSlug(input.title, ctx.db);
      const result = await ctx.db.insert(blogs).values({
        ...input,
        slug,
      });
      return result;
    }),
  edit: baseProcedure
    .input(
      z.object({
        data: insertBlogSchema.omit({ slug: true }),
        slug: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .update(blogs)
        .set(input.data)
        .where(eq(blogs.slug, input.slug))
        .returning();
      return result[0];
    }),
  delete: baseProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const result = await ctx.db
      .delete(blogs)
      .where(eq(blogs.slug, input))
      .returning();
    return result;
  }),
  getAllPublic: baseProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(10),
        search: z.string().optional(),
        categoryId: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      const { page, limit, search, categoryId } = input;
      const offset = (page - 1) * limit;
      let conditions = [];
      if (search) {
        conditions.push(ilike(blogs.title, `%${input.search}%`));
      }
      if (categoryId && categoryId !== "all") {
        conditions.push(eq(blogs.categoryId, categoryId));
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const result = ctx.db
        .select({
          id: blogs.id,
          title: blogs.title,
          excerpt: blogs.excerpt,
          slug: blogs.slug,
          createdAt: blogs.createdAt,
        })
        .from(blogs)
        .where(where)
        .limit(limit + 1)
        .offset(offset)
        .orderBy(desc(blogs.createdAt));

      return result;
    }),
});
