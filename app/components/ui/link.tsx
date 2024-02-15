import { LinkProps, Link as RemixLink } from "@remix-run/react"
import { twMerge } from "tailwind-merge"

type Props = {
  className?: string
} & LinkProps &
  React.HTMLAttributes<HTMLAnchorElement>

export default function Link({ className, ...rest }: Props) {
  const classes = twMerge(
    "underline text-primary underline-offset-4 hover:underline hover:text-primary/80",
    className
  )
  return <RemixLink className={classes} {...rest} />
}
