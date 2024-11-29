import { type LoaderFunctionArgs, redirect } from "@remix-run/node"
import { json, useLoaderData } from "@remix-run/react"
import { PlusIcon } from "lucide-react"

import { useOnKeyPress } from "~/lib/use-key-press"
import { getSupabase } from "~/supabase/supabase.server"

import { CreateForm } from "~/components/notes/create-form"
import { Note } from "~/components/notes/note"
import { Button } from "~/components/ui/button"

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase, headers, session } = await getSupabase({ request })

    if (!session) {
        return redirect("/login")
    }

    const { data, error } = await supabase.from("notes").select("*")

    if (error) {
        console.error(error)
    }

    const notes = data ?? []

    return json({ notes }, { headers })
}

export default function Notes() {
    const { notes } = useLoaderData<typeof loader>()

    const root = notes.filter(note => !note.parent_id)

    // useOnKeyPress({
    //     // keys: ["Enter", "Meta"],
    //     key: "Enter",
    //     modifier: "Meta",
    //     cb: (_, keys) => {
    //         console.log("You pressed the key! ... keys: " + keys)
    //     },
    //     enabled: true,
    //     preventDefault: true
    // })

    return (
        <div className="flex flex-col gap-2">
            <CreateForm
                trigger={
                    <Button className="mr-auto">
                        <PlusIcon /> Create Note
                    </Button>
                }
            />

            {root.length ? (
                <div className="relative grid grid-cols-3 gap-4 grid-rows-auto">
                    {root.map(note => (
                        <Note
                            key={note.id}
                            note={note}
                            notes={notes}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center text-lg">
                    No notes yet, try creating one!
                </div>
            )}
        </div>
    )
}
