import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import { Form, json, redirect, useLoaderData } from "@remix-run/react"

import { getSupabase } from "~/supabase/supabase.server"

import { Button } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"
import { Input } from "~/components/ui/input"

export async function action({ params, request }: ActionFunctionArgs) {
    const { supabase, headers } = await getSupabase({ request })
    const { recipeId } = params
    if (!recipeId) {
        return redirect("/404", { headers })
    }

    const formData = await request.formData()
    const updates = Object.fromEntries(formData)

    const { error } = await supabase
        .from("recipes")
        .update(updates)
        .eq("id", recipeId)

    if (error) {
        console.error("TODO, what to do with error ?", error)
    }

    console.log("edit recipe", recipeId, updates, error)

    return redirect(`/recipes/${params.recipeId}/edit`)
}

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { supabase, headers, session } = await getSupabase({ request })
    if (!session) {
        return redirect("/login")
    }

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

export default function Edit() {
    const { recipe } = useLoaderData<typeof loader>()

    if (!recipe) {
        return <div>Recipe not found</div>
    }
    return (
        <div>
            <Heading>Edit Recipe</Heading>
            <p>recipes.$recipeId.edit.tsx</p>
            <Form
                className="flex flex-col gap-4"
                method="post">
                <Input
                    label="Title"
                    type="text"
                    name="title"
                    defaultValue={recipe.title}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    )
}
