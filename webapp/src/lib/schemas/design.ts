import { MAX_USERNAME, MIN_USERNAME } from "@/lib/constants";
import { z } from "zod";

export const DesignSchema = z.object({
  name: z
    .string()
    .min(MIN_USERNAME, {
      message: `Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  slug: z.string(),
  avatar: z.optional(z.string()),
  isSubDesign: z.optional(z.string()),
});
