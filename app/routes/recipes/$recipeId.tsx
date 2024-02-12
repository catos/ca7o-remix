import { LoaderFunctionArgs, json } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react"
import { createServerClient } from "@supabase/auth-helpers-remix"
// existing imports

export async function loader({ request }: LoaderFunctionArgs) {
  const response = new Response()

  const supabaseClient = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response }
  )

  const { data } = await supabaseClient.from("Recipe").select().eq("id", 1)

  return json(
    { data },
    {
      headers: response.headers,
    }
  )
}

export default function Contact() {
  const { data: recipe } = useLoaderData<typeof loader>()
  console.log(recipe)
  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
    </div>
  )
}
