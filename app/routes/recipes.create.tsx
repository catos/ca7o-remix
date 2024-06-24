import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import { Form, json, redirect } from "@remix-run/react"

import { getSupabase } from "~/supabase/supabase.server"

import { Button } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"
import { Input } from "~/components/ui/input"

export async function action({ params }: ActionFunctionArgs) {
    console.log("edit recipe", params.recipeId)
    return redirect(`/recipes${params.recipeId}/edit`)
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
        <div>
            <Heading>Create new recipe</Heading>
            <p>recipes.$recipeId.edit.tsx</p>
            <Form
                className="flex flex-col gap-4"
                action="edit"
                method="post">
                <Input
                    label="Name"
                    type="text"
                    name="name"
                />
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    )
}
