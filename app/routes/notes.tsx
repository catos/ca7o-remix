import { type LoaderFunctionArgs, redirect } from "@remix-run/node"
import { json, useLoaderData } from "@remix-run/react"

import { getSupabase } from "~/supabase/supabase.server"

import { Markdown } from "~/components/markdown"
import { CreateForm } from "~/components/notes/create-form"
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

            <div className="grid grid-cols-3 gap-2">
                {notes.map(note => (
                    <Card key={note.id}>
                        <Markdown>{note.content}</Markdown>
                    </Card>
                ))}
            </div>
        </div>
    )
}
