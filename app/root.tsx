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

import { getSupabase, getSupabaseEnv } from "./supabase/supabase.server"
import { useGetSupabase } from "./supabase/use-get-supabase"

import { Footer } from "./components/footer"
import { Header } from "./components/header"
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

    return json({ domainUrl, env, session }, { headers })
}

export default function App() {
    const { domainUrl, env, session } = useLoaderData<typeof loader>()

    const { supabase } = useGetSupabase({ env, session })

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
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
