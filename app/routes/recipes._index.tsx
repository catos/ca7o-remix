import { LoaderFunctionArgs } from "@remix-run/node"
import { json, useLoaderData } from "@remix-run/react"

import { getSupabase } from "~/supabase/supabase.server"

import { RecipeCard } from "~/components/recipe-card"
import { Heading } from "~/components/ui/heading"

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase, headers } = await getSupabase({ request })

    const { data, error } = await supabase.from("recipes").select("*")

    if (error) {
        console.error(error)
    }

    return json({ recipes: data ?? [] }, { headers })
}

export default function Recipes() {
    const { recipes } = useLoaderData<typeof loader>()

    return (
        <div>
            <Heading>Recipes</Heading>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {recipes.map(recipe => (
                    <RecipeCard
                        key={recipe.id}
                        image={recipe.image}
                        href={`/recipes/${recipe.id}`}
                        title={recipe.title}
                        isFavorite={false}
                        rating={3.5}
                        time={35}
                        difficulty={1}
                        description="..."
                    />
                ))}
            </div>
        </div>
    )
}
