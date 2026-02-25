import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const resetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const newPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords don't match",
      });
    }
  });

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const createWorkspaceSchema = z.object({
  title: z
    .string()
    .min(4, "Workspace's name must be at least 4 characters")
    .max(15, "Workspace's name must be at most 15 characters"),
});

const rentSchema = z.object({
  category: z.string({ message: "Please select a category" }),
  image: z.instanceof(File),
  price: z.coerce.number().min(1),
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  guestCount: z.number(),
  roomCount: z.number(),
  bathroomCount: z.number(),
  location: z.object({
    value: z.string(),
    label: z.string(),
    flag: z.string(),
    region: z.string(),
    latlng: z.tuple([z.number(), z.number()]),
  }),
});

export {
  loginSchema,
  registerSchema,
  resetSchema,
  newPasswordSchema,
  emailSchema,
  createWorkspaceSchema,
  rentSchema,
};
