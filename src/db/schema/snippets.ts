import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const snippets = pgTable("snippets", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  description: text("description"), // optional short summary / excerpt
  language: varchar("language", { length: 50 }).default("typescript"), // e.g., javascript, python
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSnippetSchema = createInsertSchema(snippets);
export const selectSnippetSchema = createSelectSchema(snippets);

export type InsertSnippet = typeof snippets.$inferInsert;
export type SelectSnippet = typeof snippets.$inferSelect;
