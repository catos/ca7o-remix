import Heading from "~/components/ui/heading"
import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { createServerClient } from "@supabase/auth-helpers-remix"
import { Database } from "types/supabase"
import Card from "~/components/recipe/card"

export async function loader({ request }: LoaderFunctionArgs) {
  const response = new Response()

  const supabaseClient = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response }
  )
  const { data } = await supabaseClient.from("Recipe").select()

  return json(
    { data },
    {
      headers: response.headers,
    }
  )
}

type Recipe = Database["public"]["Tables"]["Recipe"]["Row"]

export default function Recipes() {
  const { data: recipes } = useLoaderData<{ data: Recipe[] }>()

  return (
    <div className="relative flex flex-col gap-4">
      <div>
        <Heading as="h2" className="mb-0 text-lg uppercase text-foreground/50">
          Nylig lagt til
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {recipes.map((recipe) => (
            <Card
              key={recipe.id}
              image={recipe.image}
              href={`/recipes/${recipe.id}`}
              title={recipe.title}
              description={recipe.description}
            />
          ))}
        </div>
      </div>

      <div>
        <Heading as="h2" className="mb-0 text-lg uppercase text-foreground/50">
          TODO: Nylig besøkt
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          ...
        </div>
      </div>

      <div>
        <Heading as="h2" className="mb-0 text-lg uppercase text-foreground/50">
          TODO: Favoritter
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          ...
        </div>
      </div>

      <div>
        <Heading as="h2" className="mb-0 text-lg uppercase text-foreground/50">
          TODO: Anbefalt
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          ...
        </div>
      </div>
    </div>
  )
}
