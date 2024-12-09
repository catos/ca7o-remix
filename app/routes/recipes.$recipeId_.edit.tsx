import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import { Form, json, redirect, useLoaderData } from "@remix-run/react"

import { getSupabase } from "~/supabase/supabase.server"

import { Button } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"

export async function action({ params, request }: ActionFunctionArgs) {
    const { supabase, headers, session } = await getSupabase({ request })
    if (!session) {
        return redirect("/login")
    }

    const { recipeId } = params
    if (!recipeId) {
        return redirect("/404", { headers })
    }

    const formData = await request.formData()
    const updates = {
        ...Object.fromEntries(formData),
        updated_at: new Date().toISOString()
    }

    const { error } = await supabase
        .from("recipes")
        .update(updates)
        .eq("id", recipeId)

    if (error) {
        console.error("TODO, what to do with error ?", error)
    }

    return redirect(`/recipes/${recipeId}`)
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

    const handleDelete = (event: React.FormEvent) => {
        const response = confirm(
            "Please confirm you want to delete this record."
        )
        if (!response) {
            event.preventDefault()
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <Heading>Editing "{recipe.title}"</Heading>
            <section>
                <Form
                    action={`/recipes/${recipe.id}/destroy`}
                    method="post"
                    onSubmit={handleDelete}>
                    <Button type="submit">Delete recipe</Button>
                </Form>
            </section>
            <Form
                className="flex flex-col gap-4"
                method="post">
                <Input
                    label="Title"
                    type="text"
                    name="title"
                    defaultValue={recipe.title}
                />
                <Input
                    label="Image"
                    type="text"
                    name="image"
                    defaultValue={recipe.image}
                />
                <Textarea
                    label="Description"
                    name="description"
                    defaultValue={recipe.description ?? ""}
                />
                <Textarea
                    label="Ingredients"
                    name="ingredients"
                    height={64 * 2}
                    defaultValue={recipe.ingredients}
                />
                <Textarea
                    label="Instructions"
                    name="instructions"
                    height={64 * 3}
                    defaultValue={recipe.instructions}
                />
                <Button
                    className="mt-4"
                    type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
