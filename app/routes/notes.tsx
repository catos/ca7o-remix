import { type LoaderFunctionArgs, redirect } from "@remix-run/node"
import { json, useLoaderData } from "@remix-run/react"
import { PlusIcon } from "lucide-react"

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
                <div className="grid grid-cols-3 gap-2">
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
