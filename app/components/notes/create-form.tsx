import { Form, useFetcher } from "@remix-run/react"
import { PlusIcon } from "lucide-react"
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

export function CreateForm({ parentId }: { parentId?: string }) {
    const [open, setOpen] = useState(false)

    // TODO: use isFocused ?!?
    // const [isFocused, setIsFocused] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const fetcher = useFetcher()
    const isCreating = fetcher.state !== "idle"

    const [content, setContent] = useState("")

    const handleSubmit = async () => {
        console.log("handleSubmit", content)
        if (!content) {
            return
        }

        const formData = new FormData()
        formData.append("content", content)

        if (parentId) {
            formData.append("parentId", parentId)
        }

        fetcher.submit(formData, { method: "post", action: "/notes/create" })

        // TODO: check if success before closing!
        setOpen(false)
        setContent("")
        // setIsFocused(false)
        textareaRef.current?.blur()
    }

    // TODO: understand and maybe create custom hook for this ?
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "38px" // Reset height - important to shrink on delete
            const computed = window.getComputedStyle(textareaRef.current)
            const height =
                textareaRef.current.scrollHeight +
                parseInt(computed.getPropertyValue("border-top-width")) +
                parseInt(computed.getPropertyValue("border-bottom-width"))
            textareaRef.current.style.height = `${height}px`
        }
    }, [content])

    // TODO: trigger only when textarea is focused
    useSubmitOnShortcut(handleSubmit)

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}>
            <DialogTrigger>
                <PlusIcon className="w-4 h-4" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a note</DialogTitle>
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
                        disabled={isCreating}
                        // hidden={!isFocused}
                        type="submit">
                        {isCreating ? "Saving..." : "Save"}
                    </Button>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

// TODO: make generix (ex. useShortcut(...)), one does not simply typescript a predicate parameter
// TODO: optimize ?
function useSubmitOnShortcut(cb: (e: KeyboardEvent) => void) {
    const handler = (e: KeyboardEvent) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            cb(e)
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handler)

        return () => {
            window.removeEventListener("keydown", handler)
        }
    })
}
