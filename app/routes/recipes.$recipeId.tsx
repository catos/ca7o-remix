import { LoaderFunctionArgs, json } from "@remix-run/node"
import { Link, redirect, useLoaderData } from "@remix-run/react"
import { CookingPotIcon, HeartIcon, PrinterIcon } from "lucide-react"

import { getSupabase } from "~/supabase/supabase.server"

import { Image } from "~/components/image"
import { Markdown } from "~/components/markdown"
import { Heading } from "~/components/ui/heading"

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { supabase, headers } = await getSupabase({ request })

    const { recipeId } = params
    if (!recipeId) {
        return redirect("/404", { headers })
    }

    const { data } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", recipeId)
        .single()

    return json({ recipe: data }, { headers })
}

export default function Recipe() {
    const { recipe } = useLoaderData<typeof loader>()

    if (!recipe) {
        return <div>Recipe not found</div>
    }

    {
        /* TODO: add delete to recipe edit <Form
action="destroy"
method="post"
onSubmit={(event) => {
    const response = confirm(
    "Please confirm you want to delete this record."
    )
    if (!response) {
    event.preventDefault()
    }
}}
>
<Button type="submit">Delete</Button>
</Form> */
    }

    return (
        <div className="flex flex-col gap-4">
            <section className="relative">
                <Link
                    className="absolute top-2 right-2 no-underline font-bold opacity-60 bg-background rounded-full p-2 text-foreground"
                    to={`/recipes/${recipe.id}/edit`}>
                    <CookingPotIcon />
                </Link>

                <Image
                    className="max-h-64 sm:max-h-96 object-cover"
                    src={recipe.image}
                    alt={recipe.title}
                />
            </section>

            <section className="flex flex-col">
                <Heading
                    as="h1"
                    className="px-4 m-0 text-center font-semibold">
                    {recipe.title}
                </Heading>

                {/* <div className="py-4 flex gap-2 justify-center">
                    <Badge>Fisk</Badge>
                    <Badge>Enkel</Badge>
                    <Badge>Sunn</Badge>
                </div> */}
            </section>

            {recipe.description && (
                <section className="text-center">{recipe.description}</section>
            )}

            <section className="gap-4 justify-center">
                {/* <ToggleFavorite recipe={recipe} /> */}
                <HeartIcon className="w-6 h-6 text-orange-600" />
                <PrinterIcon className="w-6 h-6 text-orange-600" />
            </section>

            <div className="flex flex-col gap-4 sm:flex-row">
                <section className="min-h-64rounded-md sm:w-1/2 md:w-5/12">
                    <Heading
                        as="h2"
                        className="uppercase text-foreground/50 text-base">
                        Ingrendienser
                    </Heading>
                    <Markdown className="text-foreground list-disc">
                        {recipe.ingredients}
                    </Markdown>
                </section>

                <section className="min-h-64 rounded-md sm:w-1/2 md:w-7/12">
                    <Heading
                        as="h2"
                        className="uppercase text-foreground/50 text-base">
                        Fremgangsmåte
                    </Heading>
                    <Markdown className="text-foreground">
                        {recipe.instructions}
                    </Markdown>
                </section>
            </div>
        </div>
    )
}
