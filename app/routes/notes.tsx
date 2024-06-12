import { redirect, type LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/react"
import { getSupabase } from "~/supabase/supabase.server"

export async function loader({ request }: LoaderFunctionArgs) {
  const { headers, session } = await getSupabase({ request })

  if (!session) {
    return redirect("/login")
  }

  return json({ headers })
}

export default function Notes() {
  return (
    <div>
      <h1>Notes is a protected Route</h1>
    </div>
  )
}
