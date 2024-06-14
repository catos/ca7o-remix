import { twMerge } from "tailwind-merge"

type ButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    variant?: "default" | "outline" | "link"
}

const variants = {
    default: "bg-slate-100 hover:bg-slate-200",
    outline: "border border-slate-600 text-slate-600 hover:text-slate-900",
    link: "text-slate-100 hover:text-slate-200"
}

export function Button({
    children,
    className,
    variant = "default",
    ...rest
}: ButtonPropsType) {
    const classes = twMerge(
        "px-4 py-2 rounded-md",
        variants[variant],
        className
    )
    return (
        <button
            className={classes}
            type="submit"
            {...rest}>
            {children}
        </button>
    )
}
