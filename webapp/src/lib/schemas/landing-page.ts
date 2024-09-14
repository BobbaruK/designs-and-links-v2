import { MAX_USERNAME, MIN_USERNAME } from "@/lib/constants";
import { z } from "zod";

export const LandingPageSchema = z.object({
  name: z
    .string()
    .min(MIN_USERNAME, {
      message: `Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  slug: z.string(),
  url: z
    .string()
    .startsWith("https://", { message: "Must provide secure URL" }),
  whatsapp: z.optional(z.boolean()),
  fxoroFooter: z.optional(z.boolean()),
  requester: z.optional(z.string()),
  topic: z.optional(z.string()),
  design: z.optional(z.string()),
  subDesign: z.optional(z.string()),
  formValidation: z.optional(z.string()),
  license: z.optional(z.string()),
  lpType: z.optional(z.string()),
  language: z.optional(z.string()),
  brand: z.optional(z.string()),
});
