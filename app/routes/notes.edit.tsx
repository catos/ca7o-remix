import { ActionFunctionArgs, json, redirect } from "@remix-run/node"

import { getSupabase } from "~/supabase/supabase.server"

export async function action({ params, request }: ActionFunctionArgs) {
    const { supabase, session, headers } = await getSupabase({ request })
    if (!session) {
        return { redirect: "/login" }
    }

    const formData = await request.formData()
    const id = formData.get("id") as string
    const content = formData.get("content") as string

    if (!content) {
        return json({ error: "Content is required" }, { status: 400, headers })
    }

    const updates = {
        content,
        updated_at: new Date().toISOString()
    }

    const { error } = await supabase.from("notes").update(updates).eq("id", id)

    if (error) {
        console.error(error)
        return json({ error: "Failed to edit note" }, { status: 500, headers })
    }

    return json({ success: true }, { headers })
}
