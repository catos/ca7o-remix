import { type LoaderFunctionArgs, redirect } from "@remix-run/node"
import { json, useLoaderData } from "@remix-run/react"

import { getSupabase } from "~/supabase/supabase.server"

import { Markdown } from "~/components/markdown"
import { CreateForm } from "~/components/notes/create-form"
import { Heading } from "~/components/ui/heading"

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
        <div>
            <Heading>Notes</Heading>

            <CreateForm />

            <div className="grid grid-cols-3 gap-2">
                {notes.map(note => (
                    <div
                        key={note.id}
                        className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <div className="mt-1 max-w-2xl text-sm text-gray-500">
                                <Markdown>{note.content}</Markdown>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
