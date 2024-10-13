import { LoaderFunctionArgs } from "@remix-run/node"
import { Link, json, useLoaderData } from "@remix-run/react"

import { getSupabase } from "~/supabase/supabase.server"

import { RecipeCard } from "~/components/recipe-card"

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase, headers } = await getSupabase({ request })
    const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("updated_at", { ascending: false })

    if (error) {
        console.error(error)
    }

    const recipes = data ?? []

    return json({ recipes }, { headers })
}

export default function Recipes() {
    const { recipes } = useLoaderData<typeof loader>()

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end">
                <Link to="/recipes/create">Ny</Link>
            </div>

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
