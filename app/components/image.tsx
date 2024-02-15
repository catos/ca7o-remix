import { twMerge } from "tailwind-merge"

type Props = {
  src: string
  alt: string
  className?: string
}

// TODO: use Next image
export default function Image({ src, alt, className }: Props) {
  const classes = twMerge("w-full", className)
  return <img className={classes} src={src} alt={alt} />
}
