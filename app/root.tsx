import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react"
import { Header } from "./components/header"
import type { LinksFunction } from "@remix-run/node"
import stylesheet from "./tailwind.css?url"

export type MyOutletContext = {
  lol: string
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesheet }]
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <Header />
          {children}
        </div>
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  )
}

export default function App() {
  const lol = "lolerdk"

  return <Outlet context={{ lol }} />
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    )
  }

  return (
    <>
      <h1>Error!</h1>
      <p>{(error as Error)?.message ?? "Unknown error"}</p>
    </>
  )
}
