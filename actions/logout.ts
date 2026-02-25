import { signOut } from "@/lib/auth-client";

export async function logout() {
  await signOut();
}
