import { json } from "@remix-run/node"
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from "@remix-run/react"
import {
  createBrowserClient,
  createServerClient,
} from "@supabase/auth-helpers-remix"
import { useEffect, useState } from "react"
import { Database } from "types/supabase"

import stylesheet from "~/tailwind.css"
import { themeSessionResolver } from "./sessions.server"
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes"
import clsx from "clsx"
import { ModeToggle } from "./components/mode-toggle"
import NavLink from "./components/ui/nav-link"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getTheme } = await themeSessionResolver(request)

  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  }

  const response = new Response()

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      request,
      response,
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return json(
    {
      env,
      session,
      theme: getTheme(),
    },
    {
      headers: response.headers,
    }
  )
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>()
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  )
}

export function App() {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()

  const [supabase] = useState(() =>
    createBrowserClient<Database>(
      data.env.SUPABASE_URL,
      data.env.SUPABASE_ANON_KEY
    )
  )

  const serverAccessToken = data.session?.access_token
  const { revalidate } = useRevalidator()
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event !== "INITIAL_SESSION" &&
        session?.access_token !== serverAccessToken
      ) {
        // server and client are out of sync.
        revalidate()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [serverAccessToken, supabase, revalidate])

  // TODO: do something useful with this ?  console.log("session", data.session)

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className="bg-background text-foreground">
        <nav className="py-2 px-4 border-b">
          <ul className="flex items-center gap-4">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/recipes">Recipes</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="ml-auto">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
        <main className="p-4">
          <Outlet context={{ supabase }} />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
