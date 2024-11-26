import { Form, useFetcher } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"

import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
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

    // TODO: use isFocused ?!?
    // const [isFocused, setIsFocused] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const fetcher = useFetcher()
    const isLoading = fetcher.state !== "idle"

    const [content, setContent] = useState(note.content)

    const handleSubmit = async () => {
        if (!content) {
            return
        }

        const formData = new FormData()
        formData.append("id", note.id)
        formData.append("content", content)

        fetcher.submit(formData, { method: "post", action: "/notes/edit" })

        // TODO: check if success before closing!
        setOpen(false)
        setContent("")
        // setIsFocused(false)
        textareaRef.current?.blur()
    }

    // TODO: understand and maybe create custom hook for this ?
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "96px" // Reset height - important to shrink on delete
            const computed = window.getComputedStyle(textareaRef.current)
            const height =
                textareaRef.current.scrollHeight +
                parseInt(computed.getPropertyValue("border-top-width")) +
                parseInt(computed.getPropertyValue("border-bottom-width"))
            textareaRef.current.style.height = `${height}px`
        }
    }, [content])

    // TODO: trigger only when textarea is focused
    // useOnKeyPress(isFocused, handleSubmit)

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit note</DialogTitle>
                    <DialogDescription>
                        It supports markdown! Blabla...
                    </DialogDescription>
                </DialogHeader>
                <Form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4">
                    <Textarea
                        ref={textareaRef}
                        name="content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Type your note here..."
                        // onFocus={() => setIsFocused(true)}
                        // onBlur={() => setIsFocused(false)}
                    />

                    <Button
                        disabled={isLoading}
                        // hidden={!isFocused}
                        type="submit">
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </Form>
            </DialogContent>
        </Dialog>
    )
}