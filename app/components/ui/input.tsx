import { InputHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

import { Label } from "~/components/ui/label"

type Props = {
    label?: string
} & InputHTMLAttributes<HTMLInputElement>

export function Input(props: Props) {
    const { id, label, className, ...rest } = props
    const classes = twMerge(
        "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
        className
    )

    const Input = (
        <input
            className={classes}
            id={id}
            {...rest}
        />
    )

    if (!label) {
        return Input
    }

    return (
        <div>
            {label && <Label htmlFor={id}>{label}</Label>}
            {Input}
        </div>
    )
}
