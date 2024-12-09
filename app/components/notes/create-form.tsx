import { Form, useFetcher } from "@remix-run/react"
import { useState } from "react"

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

export function CreateForm({
    trigger,
    parentId
}: {
    trigger: JSX.Element
    parentId?: string
}) {
    const [open, setOpen] = useState(false)

    // TODO: use isFocused ?!?
    const [isFocused, setIsFocused] = useState(false)

    const fetcher = useFetcher()
    const isCreating = fetcher.state !== "idle"

    const [content, setContent] = useState("")

    const handleSubmit = async () => {
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
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a note</DialogTitle>
                    <DialogDescription>
                        It supports markdown! Blabla...isFocused:{" "}
                        {isFocused.toString()}
                    </DialogDescription>
                </DialogHeader>
                <Form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4">
                    <Textarea
                        name="content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Type your note here..."
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
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
