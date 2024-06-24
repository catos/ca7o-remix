import { type LoaderFunctionArgs, redirect } from "@remix-run/node"
import { json, useFetcher, useLoaderData } from "@remix-run/react"
import { TrashIcon } from "lucide-react"

import { getSupabase } from "~/supabase/supabase.server"

import { Markdown } from "~/components/markdown"
import { CreateForm } from "~/components/notes/create-form"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"

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

    return (
        <div className="flex flex-col gap-6">
            <CreateForm />

            {notes.length ? (
                <div className="grid grid-cols-3 gap-2">
                    {notes.map(note => (
                        <Note
                            key={note.id}
                            note={note}
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

// TODO: move this to a separate file ?
type NoteType = {
    content: string
    created_at: string
    id: string
    parent_id: string | null
    state: number
    updated_at: string
    user_id: string
}

function Note({ note }: { note: NoteType }) {
    const fetcher = useFetcher()
    const handleDelete = async () => {
        fetcher.submit(
            { id: note.id },
            { method: "delete", action: "/notes/delete" }
        )
    }

    return (
        <Card
            className="relative max-h-48 overflow-y-hidden"
            key={note.id}>
            <Markdown>{note.content}</Markdown>
            <Button
                className="absolute top-2 right-2 rounded-full p-2 bg-transparent"
                onClick={handleDelete}>
                <TrashIcon className="w-4 h-4" />
            </Button>
        </Card>
    )
}
