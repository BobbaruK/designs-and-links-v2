import {
  MAX_DESCRIPTION,
  MAX_PASSWORD,
  MAX_USERNAME,
  MIN_PASSWORD,
  MIN_USERNAME,
  userRoles,
} from "@/lib/constants";
import { z } from "zod";

// Login schemas
const passwordRefine = (password: string, ctx: z.RefinementCtx) => {
  const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
  const containsLowercase = (ch: string) => /[a-z]/.test(ch);
  const containsSpecialChar = (ch: string) =>
    /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

  let countOfUpperCase = 0,
    countOfLowerCase = 0,
    countOfNumbers = 0,
    countOfSpecialChar = 0;

  for (let i = 0; i < password.length; i++) {
    let ch = password.charAt(i);

    if (!isNaN(+ch)) countOfNumbers++;
    else if (containsUppercase(ch)) countOfUpperCase++;
    else if (containsLowercase(ch)) countOfLowerCase++;
    else if (containsSpecialChar(ch)) countOfSpecialChar++;
  }

  if (
    countOfLowerCase < 1 ||
    countOfUpperCase < 1 ||
    countOfSpecialChar < 1 ||
    countOfNumbers < 1
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password does not meet complexity requirements",
    });
  }
};

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, {
    message: `Password is required`,
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(MIN_USERNAME, {
      message: `Username must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Username must be ${MAX_USERNAME} or fewer characters long`,
    }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(MIN_PASSWORD, {
      message: `Password must be ${MIN_PASSWORD} or more characters long`,
    })
    .max(MAX_PASSWORD, {
      message: `Password must be ${MAX_PASSWORD} or fewer characters long`,
    })
    .superRefine((password, ctx) => passwordRefine(password, ctx)),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(MIN_PASSWORD, {
      message: `Password must be ${MIN_PASSWORD} or more characters long`,
    })
    .max(MAX_PASSWORD, {
      message: `Password must be ${MAX_PASSWORD} or fewer characters long`,
    })
    .superRefine((password, ctx) => passwordRefine(password, ctx)),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum(userRoles()),
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
    newPassword: z.optional(
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
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;

      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) return false;

      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    },
  );

// Form validation schemas
export const EditFormValidationSchema = z.object({
  name: z
    .string()
    .min(MIN_USERNAME, {
      message: `Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  slug: z.string(),
  description: z
    .string()
    // .min(10, {
    //   message: "Description must be at least 10 characters.",
    // })
    .max(MAX_DESCRIPTION, {
      message: `Description must not be longer than ${MAX_DESCRIPTION} characters.`,
    })
    .optional(),
});

export const AddFormValidationSchema = z.object({
  name: z
    .string()
    .min(MIN_USERNAME, {
      message: `Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  slug: z.string(),
  description: z
    .string()
    // .min(10, {
    //   message: "Description must be at least 10 characters.",
    // })
    .max(MAX_DESCRIPTION, {
      message: `Description must not be longer than ${MAX_DESCRIPTION} characters.`,
    })
    .optional(),
});

// Admin user schemas
export const AdminUserEditSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum(userRoles()),
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
});

export const AdminUserAddSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum(userRoles()),
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
});

// Avatar schemas
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
