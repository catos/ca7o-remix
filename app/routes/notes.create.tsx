import { ActionFunctionArgs, json } from "@remix-run/node"

import { getSupabase } from "~/supabase/supabase.server"

export async function action({ request }: ActionFunctionArgs) {
    const { supabase, session, headers } = await getSupabase({ request })

    if (!session) {
        return { redirect: "/login" }
    }

    const formData = await request.formData()
    const content = formData.get("content") as string
    const parentId = formData.get("parentId") as string | undefined

    if (!content) {
        return json({ error: "Content is required" }, { status: 400, headers })
    }

    const note = {
        content,
        parent_id: parentId,
        user_id: session.user.id
    }

    const { error } = await supabase.from("notes").insert(note)

    if (error) {
        console.error(error)
        return json(
            { error: "Failed to create note" },
            { status: 500, headers }
        )
    }

    return json({ success: true }, { headers })
}
