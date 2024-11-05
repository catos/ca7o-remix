import { useFetcher } from "@remix-run/react"
import { PlusIcon, TrashIcon } from "lucide-react"

import { Markdown } from "~/components/markdown"
import { CreateForm } from "~/components/notes/create-form"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter } from "~/components/ui/card"

type NoteType = {
    content: string
    created_at: string
    id: string
    parent_id: string | null
    state: number
    updated_at: string
    user_id: string
}

type NoteProps = {
    note: NoteType
    notes: NoteType[]
}

export function Note({ note, notes }: NoteProps) {
    const fetcher = useFetcher()

    const handleDelete = async () => {
        fetcher.submit(
            { id: note.id },
            { method: "delete", action: "/notes/delete" }
        )
    }

    const notePreview =
        note.content.length > 100
            ? note.content.slice(0, 100) + "..."
            : note.content

    const children = notes.filter(n => n.parent_id === note.id)

    return (
        <Card
            className="relative"
            key={note.id}>
            <CardContent>
                <Markdown>{notePreview}</Markdown>
                {children.map(child => (
                    <Note
                        key={child.id}
                        note={child}
                        notes={notes}
                    />
                ))}
            </CardContent>

            <CardFooter className="justify-end hover:bg-slate-100">
                <Button
                    size="iconSm"
                    variant="ghost"
                    className="rounded-full"
                    onClick={handleDelete}>
                    <TrashIcon />
                </Button>
                <CreateForm
                    trigger={
                        <Button
                            size="iconSm"
                            variant="ghost"
                            className="rounded-full">
                            <PlusIcon />
                        </Button>
                    }
                    parentId={note.id}
                />
            </CardFooter>
        </Card>
    )
}
