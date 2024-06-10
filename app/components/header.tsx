import { Link } from "@remix-run/react"
import { Logo } from "./logo"

export function Header() {
  return (
    <header className="flex items-center gap-2 h-16 border-b border-primary-300 px-4 sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-slate-700">
      <Link className="hover:bg-primary/5 rounded-full mr-4" to="/">
        <Logo />
      </Link>

      <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
        <ul className="flex gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
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
    </header>
  )
}
