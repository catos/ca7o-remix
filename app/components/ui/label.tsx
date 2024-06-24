type Props = {
    htmlFor?: string
    children: React.ReactNode
}

export function Label({ htmlFor, children }: Props) {
    return (
        <label
            className="block text-foreground/80 text-sm font-bold mb-2 cursor-pointer"
            htmlFor={htmlFor}>
            {children}
        </label>
    )
}
