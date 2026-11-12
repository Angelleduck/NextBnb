import { useSession } from "@/lib/auth-client";

export function useCurrentUser() {
  const { data: session, isPending, error } = useSession();

  return {
    user: session?.user ?? null,
    session,
    isPending,
    error,
  };
}
