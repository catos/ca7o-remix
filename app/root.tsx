import type {
    LinksFunction,
    LoaderFunctionArgs,
    MetaFunction
} from "@remix-run/node"
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    json,
    useLoaderData
} from "@remix-run/react"
import clsx from "clsx"
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes"

import { getSupabase, getSupabaseEnv } from "./supabase/supabase.server"
import { useGetSupabase } from "./supabase/use-get-supabase"

import { Footer } from "./components/footer"
import { Header } from "./components/header"
import { themeSessionResolver } from "./sessions.server"
import stylesheet from "./tailwind.css?url"

export const meta: MetaFunction = () => {
    return [
        { title: "ca7o deux" },
        { name: "description", content: "Welcome to ca7o!" }
    ]
}

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: stylesheet }]
}

export async function loader({ request }: LoaderFunctionArgs) {
    const env = getSupabaseEnv()
    const domainUrl = process.env.DOMAIN_URL
    const { session, headers } = await getSupabase({ request })

    const { getTheme } = await themeSessionResolver(request)
    const theme = getTheme()

    return json({ domainUrl, env, session, theme }, { headers })
}

// Wrap your app with ThemeProvider.
// `specifiedTheme` is the stored theme in the session storage.
// `themeAction` is the action name that's used to change the theme in the session storage.
export default function AppWithProviders() {
    const data = useLoaderData<typeof loader>()
    return (
        <ThemeProvider
            specifiedTheme={data.theme}
            themeAction="/action/set-theme">
            <App />
        </ThemeProvider>
    )
}

export function App() {
    const {
        domainUrl,
        env,
        session,
        theme: dataTheme
    } = useLoaderData<typeof loader>()

    const { supabase } = useGetSupabase({ env, session })
    const [theme] = useTheme()

    return (
        <html
            lang="en"
            className={clsx(theme)}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <PreventFlashOnWrongTheme ssrTheme={Boolean(dataTheme)} />
                <Links />
            </head>
            <body>
                <div className="relative flex min-h-screen flex-col bg-background">
                    <Header session={session} />
                    <main className="container min-h-screen mx-auto p-4">
                        <Outlet context={{ supabase, domainUrl }} />
                    </main>
                    <Footer />
                    <Scripts />
                    <ScrollRestoration />
                </div>
            </body>
        </html>
    )
}

// TODO: figure out how to correctly implement custom 404 and 500 pages - https://remix.run/docs/en/main/guides/not-found
// export function ErrorBoundary() {
//   const error = useRouteError()

//   if (isRouteErrorResponse(error)) {
//     return (
//       <>
//         <h1>
//           {error.status} {error.statusText}
//         </h1>
//         <p>{error.data}</p>
//       </>
//     )
//   }

//   return (
//     <>
//       <Heading>Error!</Heading>
//       <p>{(error as Error)?.message ?? "Unknown error"}</p>
//     </>
//   )
// }

// export function ErrorBoundary() {
//   const error = useRouteError()
//   return (
//     <html lang="en">
//       <head>
//         <title>Oops!</title>
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         <h1>
//           {isRouteErrorResponse(error)
//             ? `${error.status} ${error.statusText}`
//             : error instanceof Error
//             ? error.message
//             : "Unknown Error"}
//         </h1>
//         <Scripts />
//       </body>
//     </html>
//   )
// }
