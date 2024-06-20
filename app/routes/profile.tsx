import { LoaderFunctionArgs } from "@remix-run/node"
import {
    json,
    redirect,
    useLoaderData,
    useOutletContext
} from "@remix-run/react"

import { getSupabase } from "~/supabase/supabase.server"
import { SupabaseOutletContext } from "~/supabase/use-get-supabase"

import { Avatar } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"

export async function loader({ request }: LoaderFunctionArgs) {
    const { headers, session } = await getSupabase({ request })

    if (!session) {
        return redirect("/login")
    }

    const profile = {
        id: session.user.id,
        email: session.user.email,
        fullName: session.user.user_metadata.full_name,
        avatarUrl: session.user.user_metadata.avatar_url
    }

    return json({ profile }, { headers })
}

export default function Profile() {
    const { profile } = useLoaderData<typeof loader>()
    const initials = profile.fullName
        .split(" ")
        .map((part: string) => part[0])
        .join("")

    const { supabase } = useOutletContext<SupabaseOutletContext>()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
    }

    return (
        <div className="flex justify-center">
            <section className="flex flex-col items-center gap-4 sm:w-2/3 md:w-1/2 p-4 mt-8">
                <Heading>Profile</Heading>
                <Avatar
                    fallback={initials}
                    src={profile.avatarUrl}
                    className="w-24 h-24"
                />
                <div className="flex flex-col items-center">
                    <p className="text-2xl">{profile.fullName}</p>
                    <p>{profile.email}</p>
                </div>
                <Button
                    fullWidth
                    disabled>
                    Edit profile
                </Button>
                <Button
                    variant="outline"
                    fullWidth
                    onClick={handleSignOut}>
                    Log out
                </Button>
            </section>
        </div>
    )
}
