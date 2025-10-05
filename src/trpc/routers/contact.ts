import { contact, insertContactSchema } from "@/db/schema/contact";
import { eq } from "drizzle-orm";
import z from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { sendEmail } from "@/services/email";

export const contactRouter = createTRPCRouter({
  getAll: baseProcedure.query(async ({ ctx }) => {
    console.log("[contact.getAll] fetching all contacts...");
    const result = await ctx.db.select().from(contact);
    console.log("[contact.getAll] result:", result);
    return result;
  }),

  getOne: baseProcedure.input(z.string()).query(async ({ ctx, input }) => {
    console.log("[contact.getOne] fetching id:", input);
    const result = await ctx.db
      .select()
      .from(contact)
      .where(eq(contact.id, input));
    console.log("[contact.getOne] result:", result);
    return result[0];
  }),

  create: baseProcedure
    .input(insertContactSchema)
    .mutation(async ({ ctx, input }) => {
      console.log("[contact.create] input:", input);
      try {
        const result = await ctx.db.insert(contact).values(input).returning();
        console.log("[contact.create] DB insert result:", result);

        console.log("[contact.create] sending email...");
        const emailResp = await sendEmail({
          to: "briankaine1604@gmail.com",
          subject: `New contact form submission from ${input.name}`,
          htmlBody: `
            <p><strong>Name:</strong> ${input.name}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Message:</strong> ${input.message}</p>
          `,
        });
        console.log("[contact.create] email response:", emailResp);

        return result;
      } catch (err) {
        console.error("[contact.create] error:", err);
        if (err instanceof Error) {
          console.error("[contact.create] message:", err.message);
          console.error("[contact.create] stack:", err.stack);
        }
        throw new Error("Failed to create contact"); // or TRPCError
      }
    }),

  edit: baseProcedure
    .input(
      z.object({
        data: insertContactSchema,
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("[contact.edit] input:", input);
      const result = await ctx.db
        .update(contact)
        .set(input.data)
        .where(eq(contact.id, input.id))
        .returning();
      console.log("[contact.edit] result:", result);
      return result[0];
    }),

  delete: baseProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    console.log("[contact.delete] deleting id:", input);
    const result = await ctx.db
      .delete(contact)
      .where(eq(contact.id, input))
      .returning();
    console.log("[contact.delete] result:", result);
    return result[0];
  }),
});
