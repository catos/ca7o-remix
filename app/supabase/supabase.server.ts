import {
    createServerClient,
    parseCookieHeader,
    serializeCookieHeader
} from "@supabase/ssr"

import type { Database } from "./database.types"

export const getSupabaseEnv = () => ({
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!
})

export async function getSupabase({ request }: { request: Request }) {
    const headers = new Headers()

    const supabase = createServerClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return parseCookieHeader(
                        request.headers.get("Cookie") ?? ""
                    )
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        headers.append(
                            "Set-Cookie",
                            serializeCookieHeader(name, value, options)
                        )
                    )
                }
            },
            auth: {
                detectSessionInUrl: true,
                flowType: "pkce"
            }
        }
    )

    const {
        data: { session }
    } = await supabase.auth.getSession()

    return { supabase, headers, session }
}
