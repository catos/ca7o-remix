import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

type ButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    variant?: "default" | "outline" | "link"
    fullWidth?: boolean
}

const variants = {
    default: "bg-slate-100 hover:bg-slate-200",
    outline: "border border-slate-600 text-slate-600 hover:text-slate-900",
    link: "text-slate-600 hover:text-slate-900"
}

const Button = forwardRef(function Button(
    props: ButtonPropsType,
    ref: React.Ref<HTMLButtonElement>
) {
    const {
        children,
        className,
        variant = "default",
        fullWidth = false,
        disabled = false,
        ...rest
    } = props

    const classes = twMerge(
        variant !== "link" && "px-4 py-2 rounded-md",
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed",
        variants[variant],
        className
    )
    return (
        <button
            className={classes}
            type="submit"
            {...rest}
            ref={ref}>
            {children}
        </button>
    )
})

export { Button }
