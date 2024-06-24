import { RefObject, TextareaHTMLAttributes, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

import { Label } from "~/components/ui/label"

type Props = {
    label?: string
    ref?: RefObject<HTMLTextAreaElement>
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
    const { id, label, className, ...rest } = props

    const classes = twMerge(
        "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
        className
    )
    const input = (
        <textarea
            className={classes}
            id={id}
            ref={ref}
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
