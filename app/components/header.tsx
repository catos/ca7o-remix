import { Link } from "@remix-run/react"
import { Logo } from "./logo"
import { Avatar } from "./ui/avatar"

export function Header() {
  return (
    <header className="flex items-center gap-8 h-16 border-b border-primary-300 px-4 sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10">
      <Link className="hover:bg-primary/5 rounded-full mr-auto" to="/">
        <Logo />
      </Link>

      <nav className="text-sm leading-6 font-semibold text-slate-700 hover:text-orange-600">
        <ul className="flex gap-4">
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            <Link to="/recipes/pizza">Pizza Recipe</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <Avatar
        src="https://avatars.githubusercontent.com/u/1101093?v=4"
        fallback="CS"
      />
    </header>
  )
}
