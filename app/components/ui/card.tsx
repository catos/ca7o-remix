import { twMerge } from "tailwind-merge"

type CardProps = {
    className?: string
    children: React.ReactNode
}

export function Card({ className, children }: CardProps) {
    const classes = twMerge("border rounded-lg", className)
    return <div className={classes}>{children}</div>
}

export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="p-6 flex flex-col gap-2">{children}</div>
}

type FooterProps = {
    className?: string
    children: React.ReactNode
}

export function CardFooter({ className, children }: FooterProps) {
    const classes = twMerge("px-2 flex gap-1", className)
    return <div className={classes}>{children}</div>
}
