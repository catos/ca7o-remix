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
                    className="absolute top-2 right-2 no-underline font-bold opacity-60 bg-background rounded-full p-2"
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
                <div className="py-4 flex gap-2 justify-center">
                    {/* <Badge>Fisk</Badge>
          <Badge>Enkel</Badge>
          <Badge>Sunn</Badge> */}
                </div>
                <div className="pb-4 flex gap-4 justify-center">
                    {/* <ToggleFavorite recipe={recipe} /> */}
                    <HeartIcon className="w-6 h-6 text-orange-600" />
                    <PrinterIcon className="w-6 h-6 text-orange-600" />
                </div>
            </section>

            <div className="flex flex-col gap-4 sm:flex-row">
                <section className="rounded-md sm:w-1/2 md:w-5/12 bg-white p-4">
                    <Heading
                        as="h2"
                        className="uppercase text-foreground/50 text-base">
                        Ingrendienser
                    </Heading>
                    <Markdown>{recipe.ingredients}</Markdown>
                </section>

                <section className="rounded-md sm:w-1/2 md:w-7/12 bg-white p-4">
                    <Heading
                        as="h2"
                        className="uppercase text-foreground/50 text-base">
                        Fremgangsmåte
                    </Heading>
                    <Markdown>{recipe.instructions}</Markdown>
                </section>
            </div>
        </div>
    )
}
