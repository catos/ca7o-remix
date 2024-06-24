import { Form, useFetcher } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"

import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"

export function CreateForm() {
    const fetcher = useFetcher()
    const isCreating = fetcher.state !== "idle"

    const [content, setContent] = useState("")

    const handleSubmit = async () => {
        fetcher.submit({ content }, { method: "post", action: "/notes/create" })
        setContent("")
    }

    // TODO: understand and maybe create custom hook for this ?
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "inherit" // Reset height - important to shrink on delete
            const computed = window.getComputedStyle(textareaRef.current)
            const height =
                textareaRef.current.scrollHeight +
                parseInt(computed.getPropertyValue("border-top-width")) +
                parseInt(computed.getPropertyValue("border-bottom-width"))
            textareaRef.current.style.height = `${height}px`
        }
    }, [content])

    return (
        <Form onSubmit={handleSubmit}>
            <Textarea
                ref={textareaRef}
                name="content"
                label="Content"
                value={content}
                onChange={e => setContent(e.target.value)}
            />

            <Button
                disabled={isCreating}
                type="submit">
                {isCreating ? "Saving..." : "Save"}
            </Button>
        </Form>
    )
}
