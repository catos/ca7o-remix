import { Form, useFetcher } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"

import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"

export function CreateForm() {
    const [isFocused, setIsFocused] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const fetcher = useFetcher()
    const isCreating = fetcher.state !== "idle"

    const [content, setContent] = useState("")

    const handleSubmit = async () => {
        if (!content) {
            return
        }
        fetcher.submit({ content }, { method: "post", action: "/notes/create" })
        setContent("")
        setIsFocused(false)
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
        <Form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4">
            <Textarea
                ref={textareaRef}
                name="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Type your note here..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            <Button
                disabled={isCreating}
                hidden={!isFocused}
                type="submit">
                {isCreating ? "Saving..." : "Save"}
            </Button>
        </Form>
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
