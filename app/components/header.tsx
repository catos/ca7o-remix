import { Link } from "@remix-run/react"
import { Logo } from "./logo"

export function Header() {
  return (
    <header className="flex items-center gap-2 h-16 bg-background border-b border-primary-300 px-4">
      <Link className="hover:bg-primary/5 rounded-full mr-4" to="/">
        <Logo />
      </Link>

      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
