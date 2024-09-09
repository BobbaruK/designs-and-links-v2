import { MAX_PASSWORD, MIN_PASSWORD, userRoles } from "@/lib/constants";
import { passwordRefine } from "@/lib/password-refine";
import { z } from "zod";

export const AdminUserEditSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(
    z
      .string()
      .min(MIN_PASSWORD, {
        message: `Password must be ${MIN_PASSWORD} or more characters long`,
      })
      .max(MAX_PASSWORD, {
        message: `Password must be ${MAX_PASSWORD} or fewer characters long`,
      })
      .superRefine((password, ctx) => passwordRefine(password, ctx)),
  ),
  image: z.optional(z.string()),
  role: z.enum(userRoles()),
  isTwoFactorEnabled: z.optional(z.boolean()),
});

export const AdminUserAddSchema = z.object({
  name: z.optional(z.string()),
  email: z.string().email(),
  password: z
    .string()
    .min(MIN_PASSWORD, {
      message: `Password must be ${MIN_PASSWORD} or more characters long`,
    })
    .max(MAX_PASSWORD, {
      message: `Password must be ${MAX_PASSWORD} or fewer characters long`,
    })
    .superRefine((password, ctx) => passwordRefine(password, ctx)),
  image: z.optional(z.string()),
  role: z.enum(userRoles()),
  isTwoFactorEnabled: z.optional(z.boolean()),
});
