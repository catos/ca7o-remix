import { useFetcher } from "@remix-run/react"
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react"
import { twMerge } from "tailwind-merge"

import { Markdown } from "~/components/markdown"
import { CreateForm } from "~/components/notes/create-form"
import { Button } from "~/components/ui/button"

import { EditForm } from "./edit-form"

export type NoteType = {
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
    const classes = twMerge(
        children.length > 0 && "bg-slate-100",
        note.parent_id && "w-full"
    )

    return (
        <Card
            key={note.id}
            className={classes}>
            <CardContent>
                {/* TODO: make this work! */}
                {/* <EditForm
                    trigger={<Markdown>{notePreview}</Markdown>}
                    note={note}
                /> */}
                <Markdown>{notePreview}</Markdown>

                {children.map(child => (
                    <Note
                        key={child.id}
                        note={child}
                        notes={notes}
                    />
                ))}
            </CardContent>

            <CardFooter>
                <Button
                    size="iconSm"
                    variant="ghost"
                    className="rounded-full"
                    onClick={handleDelete}>
                    <TrashIcon />
                </Button>
                <EditForm
                    trigger={
                        <Button
                            size="iconSm"
                            variant="ghost"
                            className="rounded-full">
                            <EditIcon />
                        </Button>
                    }
                    note={note}
                />
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

export function Card({
    className,
    children
}: {
    className?: string
    children: React.ReactNode
}) {
    const classes = twMerge(
        "flex flex-col gap-4 bg-slate-200 rounded-lg relative w-60",
        className
    )
    return <div className={classes}>{children}</div>
}

export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col gap-4 flex-1 p-4">{children}</div>
}

export function CardFooter({ children }: { children: React.ReactNode }) {
    return <div className="px-2 pb-1 flex gap-1 justify-end">{children}</div>
}