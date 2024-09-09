import { MAX_USERNAME, MIN_USERNAME } from "@/lib/constants";
import { z } from "zod";

export const UserAvatarSchema = z.object({
  name: z
    .string()
    .min(MIN_USERNAME, {
      message: `User avarat name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `User avarat name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  url: z.string(),
});
