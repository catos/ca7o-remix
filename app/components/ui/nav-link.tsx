import { NavLinkProps, NavLink as RemixNavLink } from "@remix-run/react"
import { twMerge } from "tailwind-merge"

type Props = {
  className?: string
} & NavLinkProps &
  React.HTMLAttributes<HTMLAnchorElement>

export default function NavLink({ className, ...rest }: Props) {
  return (
    <RemixNavLink
      className={({ isActive, isPending }) =>
        twMerge(
          "text-foreground/60 hover:text-foreground/80",
          className,
          isActive
            ? "font-semibold text-foreground"
            : isPending
            ? "pending"
            : ""
        )
      }
      {...rest}
    />
  )
}
