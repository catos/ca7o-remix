import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import { Form, json, redirect } from "@remix-run/react"

import { getSupabase } from "~/supabase/supabase.server"

import { Button } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"

type InsertType = {
    created_at: string
    description?: string | null
    id?: string
    image: string
    ingredients: string
    instructions: string
    title: string
    updated_at?: string | null
    user_id?: string
}

export async function action({ request }: ActionFunctionArgs) {
    const { supabase, session } = await getSupabase({ request })
    if (!session) {
        return redirect("/login")
    }

    const formData = await request.formData()
    const values = Object.fromEntries(formData) as InsertType

    const recipe: InsertType = {
        ...values,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: session.user.id
    }

    const { data, error } = await supabase
        .from("recipes")
        .insert(recipe)
        .select("id")
        .single()

    if (error) {
        console.error("TODO, what to do with error ?", error)
    }

    if (data) {
        return redirect(`/recipes/${data.id}/edit`)
    }

    return redirect(`/recipes`)
}

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { session } = await getSupabase({ request })

    if (!session) {
        return redirect("/login")
    }

    return json({ recipeId: params.recipeId })
}

// TODO: continue impl. https://remix.run/docs/en/main/discussion/form-vs-fetcher#creating-a-new-record
export default function Edit() {
    return (
        <div className="flex flex-col gap-4">
            <Heading>Create new recipe</Heading>
            <Form
                className="flex flex-col gap-4"
                method="post">
                <Input
                    label="Title"
                    type="text"
                    name="title"
                    defaultValue={"My new recipe title"}
                />
                <Input
                    label="Image"
                    type="text"
                    name="image"
                    defaultValue={"https://placehold.co/600x400"}
                />
                <Textarea
                    label="Description"
                    name="description"
                    defaultValue={
                        "This is a short description about the ba-dom-dish!"
                    }
                />
                <Textarea
                    label="Ingredients"
                    name="ingredients"
                    defaultValue={"List of ingredients, supports markdown"}
                />
                <Textarea
                    label="Instructions"
                    name="instructions"
                    defaultValue={
                        "Simple instructions in the precise order on how you make the recipe"
                    }
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
