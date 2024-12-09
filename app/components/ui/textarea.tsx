import {
    RefObject,
    TextareaHTMLAttributes,
    forwardRef,
    useEffect,
    useRef
} from "react"
import { twMerge } from "tailwind-merge"

import { Label } from "~/components/ui/label"

type Props = {
    label?: string
    ref?: RefObject<HTMLTextAreaElement>
    height?: number
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
    const { id, label, className, value, height = 64, ...rest } = props

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = `${height}px` // Reset height - important to shrink on delete
            const computed = window.getComputedStyle(textareaRef.current)
            const elementHeight =
                textareaRef.current.scrollHeight +
                parseInt(computed.getPropertyValue("border-top-width")) +
                parseInt(computed.getPropertyValue("border-bottom-width"))
            const clampedHeight = elementHeight > 300 ? 300 : elementHeight
            textareaRef.current.style.height = `${clampedHeight}px`
        }
    }, [value])

    const classes = twMerge(
        "flex min-h-[60px] w-full rounded border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
    )
    const input = (
        <textarea
            className={classes}
            id={id}
            ref={textareaRef}
            value={value}
            {...rest}
        />
    )

    if (!label) {
        return input
    }

    return (
        <div>
            {label && <Label htmlFor={id}>{label}</Label>}
            {input}
        </div>
    )
})

Textarea.displayName = "Textarea"

export { Textarea }
