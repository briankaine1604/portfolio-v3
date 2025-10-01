import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { projectsRouter } from "./projects";
import { blogRouter } from "./blogs";
import { categoriesRouter } from "./categories";
import { snippetRouter } from "./snippets";
export const appRouter = createTRPCRouter({
  project: projectsRouter,
  blog: blogRouter,
  category: categoriesRouter,
  snippet: snippetRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
