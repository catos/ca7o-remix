import { Session } from "@supabase/supabase-js"

import { Avatar } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Popover } from "~/components/ui/popover"

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
            <div className="flex flex-col items-center gap-4">
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
            </div>
        </Popover>
    )
}
