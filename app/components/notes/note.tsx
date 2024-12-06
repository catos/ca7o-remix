import { useFetcher } from "@remix-run/react"
import {
    differenceInSeconds,
    format,
    formatDistance,
    formatDistanceToNow
} from "date-fns"
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
    const notePreview =
        note.content.length > 300
            ? note.content.slice(0, 100) + "..."
            : note.content

    const children = notes.filter(n => n.parent_id === note.id)

    const updatedToNow = formatDistanceToNow(new Date(note.updated_at))

    const secondsAgo = differenceInSeconds(
        new Date(),
        new Date(note.updated_at)
    )
    const isNew = secondsAgo < 10

    const classes = twMerge(
        "bg-slate-200",
        children.length > 0 && "bg-slate-200",
        isNew && "bg-slate-300",
        note.parent_id && "w-full"
    )

    return (
        <Wrapper
            key={note.id}
            className={classes}>
            <Content>
                <EditForm
                    trigger={
                        <div className="cursor-pointer">
                            <Markdown>{notePreview}</Markdown>
                        </div>
                    }
                    note={note}
                />

                <div className="flex flex-col gap-1">
                    {children.map(child => (
                        <ChildNote
                            key={child.id}
                            note={child}
                        />
                    ))}
                </div>
            </Content>

            <Footer>
                <span className="text-sm">{updatedToNow}</span>
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
            </Footer>
        </Wrapper>
    )
}

function Wrapper({
    className,
    children
}: {
    className?: string
    children: React.ReactNode
}) {
    const classes = twMerge(
        "flex flex-col gap-2 p-4 rounded-lg relative flex-1",
        className
    )
    return <div className={classes}>{children}</div>
}

function Content({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col flex-1 gap-2 break-words">{children}</div>
    )
}

function Footer({ children }: { children: React.ReactNode }) {
    return <div className="flex items-center justify-between">{children}</div>
}

function ChildNote({ note }: { note: NoteType }) {
    return (
        <EditForm
            trigger={
                <div className="py-1 px-3 bg-slate-300 rounded-lg cursor-pointer">
                    {note.content}
                </div>
            }
            note={note}
        />
    )
}
