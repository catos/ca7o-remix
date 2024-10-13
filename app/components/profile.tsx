import { Session } from "@supabase/supabase-js"

import { Avatar } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Popover } from "~/components/ui/popover"

import { Heading } from "./ui/heading"

export function Profile({ session }: { session: Session }) {
    const profile = {
        id: session.user.id,
        email: session.user.email,
        fullName: session.user.user_metadata.full_name,
        avatarUrl: session.user.user_metadata.avatar_url
    }

    const initials = profile.fullName
        .split(" ")
        .map((part: string) => part[0])
        .join("")

    return (
        <Popover
            toggler={
                <Button variant="link">
                    <Avatar
                        src={profile.avatarUrl}
                        fallback={initials}
                    />
                </Button>
            }>
            <div className="flex flex-col items-center gap-4 m-4">
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
                    onClick={() => console.log("TODO: handleSignOut")}>
                    Log out
                </Button>
                <div>
                    <Heading
                        as="h2"
                        className="mb-2">
                        URLs for dev
                    </Heading>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <a href="https://supabase.com/dashboard/project/volslymfkdeblzqdnfkp">
                                Supabase project
                            </a>
                        </li>
                        <li>
                            <a href="https://remix.run/docs/en/main/start/tutorial">
                                Remix 30 min tutorial
                            </a>
                        </li>
                        <li>
                            <a href="https://supabase.com/docs/reference/javascript/insert">
                                Supabase docs - db reference
                            </a>
                        </li>
                        <li>
                            <a href="https://vercel.com/catos-projects-1ae1051f/ca7o-remix">
                                Vercel project deployment
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </Popover>
    )
}
