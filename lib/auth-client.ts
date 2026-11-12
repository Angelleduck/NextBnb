import { createAuthClient } from "better-auth/react";
export const { revokeOtherSessions, signOut, useSession, getSession, signIn } =
  createAuthClient();
