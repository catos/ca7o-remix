import { useRevalidator } from "@remix-run/react"
import { useEffect, useState } from "react"

import { createBrowserClient } from "@supabase/ssr"
import type { Session, SupabaseClient } from "@supabase/supabase-js"

import type { Database } from "./database.types"

export type TypedSupabaseClient = SupabaseClient<Database>

export type SupabaseOutletContext = {
    supabase: TypedSupabaseClient
    domainUrl: string
}

type SupabaseEnv = {
    SUPABASE_URL: string
    SUPABASE_ANON_KEY: string
}

type UseSupabaseType = {
    env: SupabaseEnv
    session: Session | null
}

export function useGetSupabase({ env, session }: UseSupabaseType) {
    // Singleton
    const [supabase] = useState(() =>
        createBrowserClient<Database>(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!)
    )
    const revalidator = useRevalidator()

    const serverAccessToken = session?.access_token

    useEffect(() => {
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((event, session) => {
            // console.log("Auth event happened: ", event, session)

            if (session?.access_token !== serverAccessToken) {
                // call loaders
                revalidator.revalidate()
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase, serverAccessToken, revalidator])

    return { supabase }
}
