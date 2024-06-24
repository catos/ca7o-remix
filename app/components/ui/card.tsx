import { twMerge } from "tailwind-merge"

type CardProps = {
    className?: string
    children: React.ReactNode
}

export function Card({ className, children }: CardProps) {
    const classes = twMerge("p-6 border rounded-lg", className)
    return <div className={classes}>{children}</div>
}
