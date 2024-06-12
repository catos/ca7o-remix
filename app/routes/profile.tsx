import { LoaderFunctionArgs } from "@remix-run/node"
import { redirect, json, useOutletContext } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"
import { getSupabase } from "~/supabase/supabase.server"
import { SupabaseOutletContext } from "~/supabase/use-get-supabase"

export async function loader({ request }: LoaderFunctionArgs) {
  const { headers, session } = await getSupabase({ request })

  if (!session) {
    return redirect("/login")
  }

  return json({ headers })
}

export default function Profile() {
  const { supabase } = useOutletContext<SupabaseOutletContext>()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div>
      <Heading>Profile</Heading>
      <Button variant="outline" onClick={handleSignOut}>
        Log out
      </Button>
    </div>
  )
}
