import { Link } from "@remix-run/react"

import { Session } from "@supabase/supabase-js"

import { Logo } from "./logo"
import { Profile } from "./profile"

export function Header({ session }: { session: Session | null }) {
    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur bg-background/75">
            <div className="container mx-auto p-4 flex items-center gap-8 h-16 sticky top-0 z-40 backdrop-blur flex-none transition-colors duration-500">
                <Link
                    className="hover:bg-primary/5 rounded-full mr-auto"
                    to="/"
                    aria-label="Home">
                    <Logo />
                </Link>

                <nav className="text-sm leading-6 font-semibold text-slate-700">
                    <ul className="flex items-center gap-4">
                        <li>
                            <HeaderLink to="/recipes">Recipes</HeaderLink>
                        </li>
                        <li>
                            <HeaderLink to="/notes">Notes</HeaderLink>
                        </li>
                        <li>
                            <HeaderLink to="/about">About</HeaderLink>
                        </li>
                        <li>
                            {session ? (
                                <Profile session={session} />
                            ) : (
                                <HeaderLink to="/login">Login</HeaderLink>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

type HeaderLinkProps = {
    to: string
    children: React.ReactNode
}

function HeaderLink({ to, children }: HeaderLinkProps) {
    return (
        <Link
            className="hover:text-orange-600"
            to={to}>
            {children}
        </Link>
    )
}
