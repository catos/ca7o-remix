import { Form, useFetcher } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"

import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Textarea } from "~/components/ui/textarea"

import { Heading } from "../ui/heading"

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
            textareaRef.current.style.height = "38px" // Reset height - important to shrink on delete
            const computed = window.getComputedStyle(textareaRef.current)
            const height =
                textareaRef.current.scrollHeight +
                parseInt(computed.getPropertyValue("border-top-width")) +
                parseInt(computed.getPropertyValue("border-bottom-width"))
            textareaRef.current.style.height = `${height}px`
        }
    }, [content])

    return (
        <Card>
            <Form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4">
                <Heading className="text-xl">Create Note</Heading>
                <Textarea
                    ref={textareaRef}
                    name="content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Type your note here..."
                />

                <Button
                    disabled={isCreating}
                    type="submit">
                    {isCreating ? "Saving..." : "Save"}
                </Button>
            </Form>
        </Card>
    )
}
