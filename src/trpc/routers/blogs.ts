import { blogs, insertBlogSchema } from "@/db/schema/blogs";
import { baseProcedure, createTRPCRouter } from "../init";
import z from "zod";
import { and, asc, desc, eq, gt, ilike, lt } from "drizzle-orm";
import { GenerateUniqueSlug } from "@/utils/slugify";
import { title } from "process";
import { categories } from "@/db/schema/categories";
import { calculateReadTime } from "@/utils/read-time";

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
      .select({
        id: blogs.id,
        title: blogs.title,
        excerpt: blogs.excerpt,
        slug: blogs.slug,
        content: blogs.content,
        createdAt: blogs.createdAt,
        categoryId: blogs.categoryId,
        categoryName: categories.name, // 👈 explicitly select category column
      })
      .from(blogs)
      .leftJoin(categories, eq(blogs.categoryId, categories.id))
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
  getOnePublic: baseProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      // 1. Fetch current post
      const current = await ctx.db
        .select({
          id: blogs.id,
          title: blogs.title,
          excerpt: blogs.excerpt,
          slug: blogs.slug,
          content: blogs.content,
          createdAt: blogs.createdAt,
          categoryName: categories.name,
        })
        .from(blogs)
        .leftJoin(categories, eq(blogs.categoryId, categories.id))
        .where(eq(blogs.slug, input));

      const post = current[0];
      if (!post) return null;

      // 2. Fetch previous (just before by date)
      const next = await ctx.db
        .select({
          slug: blogs.slug,
          title: blogs.title,
          excerpt: blogs.excerpt,
        })
        .from(blogs)
        .where(lt(blogs.createdAt, post.createdAt))
        .orderBy(desc(blogs.createdAt))
        .limit(1);

      // 3. Fetch next (just after by date)
      const prev = await ctx.db
        .select({
          slug: blogs.slug,
          title: blogs.title,
          excerpt: blogs.excerpt,
        })
        .from(blogs)
        .where(gt(blogs.createdAt, post.createdAt))
        .orderBy(asc(blogs.createdAt))
        .limit(1);

      // 4. Return with neighbors
      return {
        ...post,
        readTime: calculateReadTime(post.content),
        prev: prev[0] ?? null,
        next: next[0] ?? null,
      };
    }),
});
