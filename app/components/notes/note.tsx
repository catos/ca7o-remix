import {
    differenceInSeconds,
    format,
    formatDistance,
    formatDistanceToNow
} from "date-fns"
import { EditIcon, EllipsisVertical, PlusIcon, TrashIcon } from "lucide-react"
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
            ? note.content.slice(0, 150) + "..."
            : note.content

    const children = notes.filter(n => n.parent_id === note.id)

    const updatedToNow = formatDistanceToNow(new Date(note.updated_at))

    const secondsAgo = differenceInSeconds(
        new Date(),
        new Date(note.updated_at)
    )

    const isNew = secondsAgo < 10
    const classes = twMerge("bg-secondary", isNew && "border")

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

                {children.length > 0 && (
                    <div className="flex flex-col gap-2">
                        {children.map(child => (
                            <ChildNote
                                key={child.id}
                                note={child}
                            />
                        ))}
                    </div>
                )}
            </Content>
            <Footer>
                <span className="text-sm text-muted-foreground mr-auto">
                    {updatedToNow}
                </span>
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
                <Button
                    size="iconSm"
                    variant="ghost"
                    className="rounded-full">
                    <EllipsisVertical />
                </Button>
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
        "group flex flex-col rounded-lg relative flex-1 shadow-sm transition-opacity ease-in-out duration-150",
        className
    )
    return <div className={classes}>{children}</div>
}

function Content({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col flex-1 gap-2 p-4 break-words">
            {children}
        </div>
    )
}

function Footer({ children }: { children: React.ReactNode }) {
    return (
        <div className="invisible group-hover:visible flex items-center gap-2 px-4 py-2">
            {children}
        </div>
    )
}

function ChildNote({ note }: { note: NoteType }) {
    const content =
        note.content.length > 24
            ? note.content.substring(0, 24) + "..."
            : note.content

    return (
        <EditForm
            trigger={
                <div className="py-1 px-3 rounded-lg cursor-pointer text-sm border max-h-8">
                    {content}
                </div>
            }
            note={note}
        />
    )
}
