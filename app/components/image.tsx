import { twMerge } from "tailwind-merge"

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
    alt: string
    className?: string
}

export function Image({ alt, className, ...rest }: Props) {
    const classes = twMerge("w-full", className)

    return (
        <img
            className={classes}
            alt={alt}
            {...rest}
        />
    )
}
