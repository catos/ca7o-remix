type Props = {
    src?: string
    fallback: string
}

export function Avatar({ src, fallback }: Props) {
    return (
        <span>
            {src ? (
                <img
                    src={src}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                />
            ) : (
                <div className="flex items-center justify-center text-sm font-semibold bg-slate-200 w-8 h-8 rounded-full">
                    {fallback}
                </div>
            )}
        </span>
    )
}
