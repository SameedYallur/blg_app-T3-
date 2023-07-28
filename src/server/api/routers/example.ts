import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { User } from "@prisma/client";

export const authRouter = createTRPCRouter({
  getData: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

   registerUser : publicProcedure
  .input(z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
  }))
  .mutation(async({ input, ctx }) => {
    // Here, you can save the registration data to the database using Prisma or any other ORM
    const { email, name, password } = input;
    const user = await ctx.prisma.user.create({
      data: {
        email:input.email,
        username:input.name,
        password:input.password, // Note: In a real application, you should hash the password before storing it.
      },
    });

    return {
      user,
      message: 'Registration successful!',
    };
  }),
});
