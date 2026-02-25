import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailVerification, resetPasswordEmail } from "./lib/email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  //this prevent better tool collect info for improving
  telemetry: { enabled: false },
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
    //sendResetPass has param user, use it later to go user's email
    sendResetPassword: async ({ token }) => {
      await resetPasswordEmail(token);
    },
  },

  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    expiresIn: 3600,
    //sendverification has param user, use it later to go user's email
    sendVerificationEmail: async ({ token }) => {
      await emailVerification(token);
    },
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // Cache duration in seconds
      refreshCache: {
        updateAge: 40, // Refresh when 40 seconds remain before expiry
      },
    },
  },
  user: {
    additionalFields: {
      favoriteIds: {
        type: "string[]",
        required: false,
        defaultValue: [],
      },
    },
  },
  plugins: [nextCookies()],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES;
