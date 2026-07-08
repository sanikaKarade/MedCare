import { auth } from "@clerk/nextjs/server"

/**
 * Simple allowlist-based admin check. Add comma-separated Clerk user IDs
 * to ADMIN_USER_IDS in your .env, e.g.:
 *   ADMIN_USER_IDS=user_2abc123,user_2def456
 *
 * You can find your own Clerk user ID in the Clerk dashboard, or by
 * temporarily logging `const { userId } = await auth()` anywhere in the app.
 */
function getAdminIds(): string[] {
  return (process.env.ADMIN_USER_IDS || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
}

export function isAdminUserId(userId: string | null | undefined): boolean {
  if (!userId) return false
  return getAdminIds().includes(userId)
}

/**
 * Returns the current userId if they're an admin, otherwise null.
 * Use this at the top of every admin page/route.
 */
export async function requireAdmin(): Promise<string | null> {
  const { userId } = await auth()
  if (!isAdminUserId(userId)) return null
  return userId
}
