import { ActionFunctionArgs } from "@remix-run/node"
import { redirect } from "@remix-run/react"

import { getSupabase } from "~/supabase/supabase.server"

// TODO: Is there a better way to handle/prevent get requests to this route ?
export function loader() {
    return redirect("/recipes")
}

export async function action({ params, request }: ActionFunctionArgs) {
    const { supabase, headers, session } = await getSupabase({ request })
    if (!session) {
        return redirect("/login")
    }

    const { recipeId } = params
    if (!recipeId) {
        return redirect("/404", { headers })
    }

    const { error } = await supabase.from("recipes").delete().eq("id", recipeId)

    if (error) {
        console.error("TODO, what to do with error ?", error)
    }

    return redirect("/recipes")
}
