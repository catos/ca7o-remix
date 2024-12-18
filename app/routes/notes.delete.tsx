import { ActionFunctionArgs, json } from "@remix-run/node"

import { getSupabase } from "~/supabase/supabase.server"

export async function action({ request }: ActionFunctionArgs) {
    const { supabase, session, headers } = await getSupabase({ request })

    if (!session) {
        return { redirect: "/login" }
    }

    const formData = await request.formData()
    const id = formData.get("id") as string

    if (!id) {
        return json({ error: "Id is required" }, { status: 400, headers })
    }

    const { error: childrenError } = await supabase
        .from("notes")
        .delete()
        .eq("parent_id", id)

    if (childrenError) {
        console.error(childrenError)
        return json(
            { error: "Failed to delete children notes" },
            { status: 500, headers }
        )
    }

    const { error } = await supabase.from("notes").delete().eq("id", id)

    if (error) {
        console.error(error)
        return json(
            { error: "Failed to delete note" },
            { status: 500, headers }
        )
    }

    return json({ success: true }, { headers })
}
