import { NextResponse } from "next/server"
import type { ZodSchema } from "zod"

/**
 * Parses the JSON body of a request and validates it against a zod schema.
 * Returns { data } on success, or { error } — a ready-to-return NextResponse
 * with a 400 status — on failure. Use like:
 *
 *   const parsed = await parseBody(req, mySchema)
 *   if ("error" in parsed) return parsed.error
 *   const body = parsed.data // fully typed, validated
 */
export async function parseBody<T>(
  req: Request,
  schema: ZodSchema<T>
): Promise<{ data: T } | { error: NextResponse }> {
  let json: unknown

  try {
    json = await req.json()
  } catch {
    return {
      error: NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }),
    }
  }

  const result = schema.safeParse(json)

  if (!result.success) {
    const firstIssue = result.error.issues[0]
    const message = firstIssue
      ? `${firstIssue.path.join(".") || "request"}: ${firstIssue.message}`
      : "Invalid request"

    return {
      error: NextResponse.json(
        { error: message, issues: result.error.issues },
        { status: 400 }
      ),
    }
  }

  return { data: result.data }
}
