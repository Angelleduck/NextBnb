import { z } from "zod";
import { differenceInCalendarDays } from "date-fns";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
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

const filterSchema = z
  .object({
    location: z
      .object({
        value: z.string(),
        label: z.string(),
        flag: z.string(),
        region: z.string(),
        latlng: z.tuple([z.number(), z.number()]),
      })
      .optional(),
    guestCount: z.number(),
    roomCount: z.number(),
    bathroomCount: z.number(),
    startDate: z.date({ message: "Please select your dates" }),
    endDate: z.date({ message: "Please select your dates" }),
  })
  .refine((data) => differenceInCalendarDays(data.startDate, new Date()) >= 0, {
    path: ["startDate"],
    message: "Please select future dates",
  })
  .refine(
    (data) => differenceInCalendarDays(data.endDate, data.startDate) >= 1,
    {
      path: ["endDate"],
      message: "Please select at least one night",
    },
  );

export {
  loginSchema,
  registerSchema,
  newPasswordSchema,
  emailSchema,
  createWorkspaceSchema,
  rentSchema,
  filterSchema,
};
