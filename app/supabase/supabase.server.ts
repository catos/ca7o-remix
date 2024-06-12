import { createServerClient, parse, serialize } from "@supabase/ssr"
import type { Database } from "./database.types"

export const getSupabaseEnv = () => ({
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
})

export async function getSupabase({ request }: { request: Request }) {
  const cookies = parse(request.headers.get("Cookie") ?? "")
  const headers = new Headers()

  const supabase = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(key) {
          return cookies[key]
        },
        set(key, value, options) {
          headers.append("Set-Cookie", serialize(key, value, options))
        },
        remove(key, options) {
          headers.append("Set-Cookie", serialize(key, "", options))
        },
      },
      auth: {
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { supabase, headers, session }
}
