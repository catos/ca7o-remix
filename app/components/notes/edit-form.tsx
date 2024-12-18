import { useFetcher } from "@remix-run/react"
import { useRef, useState } from "react"

import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "~/components/ui/dialog"
import { Textarea } from "~/components/ui/textarea"

import { NoteType } from "./note"

// TODO: consolidate with CreateForm ?
export function EditForm({
    trigger,
    note
}: {
    trigger: JSX.Element
    note: NoteType
}) {
    const [open, setOpen] = useState(false)

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const fetcher = useFetcher()
    const isLoading = fetcher.state !== "idle"

    const [content, setContent] = useState(note.content)

    const handleDelete = async () => {
        fetcher.submit(
            { id: note.id },
            { method: "delete", action: "/notes/delete" }
        )
    }
    const handleUpdate = async () => {
        if (!content) {
            return
        }

        const formData = new FormData()
        formData.append("id", note.id)
        formData.append("content", content)

        // TODO: check fetcher.state and close dialog on success (wrap in custom hook?)
        fetcher.submit(formData, {
            method: "post",
            action: "/notes/edit"
        })

        // TODO: check if success before closing!
        setOpen(false)
        setContent("")
        textareaRef.current?.blur()
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit note: {note.id}</DialogTitle>
                </DialogHeader>
                <Textarea
                    name="content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Type your note here..."
                />

                <DialogFooter className="gap-2">
                    <Button
                        variant="destructive"
                        onClick={handleDelete}>
                        {"Delete"}
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={handleUpdate}>
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
