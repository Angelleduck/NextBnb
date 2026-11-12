import { useCallback, useState } from "react";
import { loginSchema } from "@/schemas";
import type { z } from "zod";
import type { ErrorCode } from "@/auth";
import { signIn } from "@/lib/auth-client";

export function useLogin() {
  const [isPending, setIsPending] = useState(false);

  const login = useCallback(async (data: z.infer<typeof loginSchema>) => {
    try {
      setIsPending(true);

      const validatedField = loginSchema.safeParse(data);

      if (!validatedField.success) {
        return {
          error: validatedField.error.errors[0].message,
        };
      }

      const { error } = await signIn.email({
        email: validatedField.data.email,
        password: validatedField.data.password,
      });

      if (error) {
        const code = error.code as ErrorCode;

        switch (code) {
          case "INVALID_EMAIL_OR_PASSWORD":
            return {
              error: "Invalid credentials",
            };

          case "EMAIL_NOT_VERIFIED":
            return {
              confirmationNeeded: "Confirmation email sent",
            };

          default:
            return {
              error: error.message ?? "Sorry something went wrong",
            };
        }
      }

      return {
        success: true,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: error.message,
        };
      }

      return {
        error: "Sorry something went wrong",
      };
    } finally {
      setIsPending(false);
    }
  }, []);

  return {
    login,
    isPending,
  };
}
