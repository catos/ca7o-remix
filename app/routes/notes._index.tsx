import { type LoaderFunctionArgs, redirect } from "@remix-run/node"
import { json, useLoaderData } from "@remix-run/react"
import { PlusIcon } from "lucide-react"

import { useOnKeyPress } from "~/lib/use-key-press"
import { getSupabase } from "~/supabase/supabase.server"

import { CreateForm } from "~/components/notes/create-form"
import { Note, NoteType } from "~/components/notes/note"
import { Button } from "~/components/ui/button"

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase, headers, session } = await getSupabase({ request })

    if (!session) {
        return redirect("/login")
    }

    const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("updated_at", { ascending: false })

    if (error) {
        console.error(error)
    }

    const notes = data ?? []

    return json({ notes }, { headers })
}

export default function Notes() {
    const { notes } = useLoaderData<typeof loader>()

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

    // const { columns, rootCount } = notesToColumns(notes)

    const rootNotes = notes.filter(note => !note.parent_id)

    return (
        <div className="flex flex-col gap-4">
            <CreateForm
                trigger={
                    <Button className="mr-auto">
                        <PlusIcon /> Create a note
                    </Button>
                }
            />

            {rootNotes.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-3">
                    {rootNotes.map(note => (
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

function notesToColumns(notes: NoteType[]) {
    const root = notes.filter(note => !note.parent_id)
    const rootCount = root.length
    const columnCount = rootCount > 3 ? 3 : rootCount
    const take = Math.ceil(rootCount / columnCount)

    const columns = []
    for (let i = 1; i < columnCount + 1; i++) {
        const _notes = root.splice(0, take)
        columns.push({ id: i, notes: _notes })
    }

    return { columns, rootCount, columnCount }
}
