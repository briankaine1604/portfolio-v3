import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { projectsRouter } from "./projects";
import { blogRouter } from "./blogs";
import { categoriesRouter } from "./categories";
import { snippetRouter } from "./snippets";
import { contactRouter } from "./contact";
import { inferRouterOutputs } from "@trpc/server";
export const appRouter = createTRPCRouter({
  project: projectsRouter,
  blog: blogRouter,
  category: categoriesRouter,
  snippet: snippetRouter,
  contact: contactRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

type RouterOutputs = inferRouterOutputs<AppRouter>;
export type BlogWithNav = RouterOutputs["blog"]["getOnePublic"];
