import { ActionFunctionArgs } from "@remix-run/node"
import { Form, redirect } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import Heading from "~/components/ui/heading"
import Input from "~/components/ui/input"

export async function action({ params }: ActionFunctionArgs) {
  console.log("edit recipe", params.recipeId)
  return redirect(`/recipes${params.recipeId}/edit`)
}

// export function loader({ params }: LoaderFunctionArgs) {
//     return json({ recipeId: params.recipeId })
//   }

export default function Edit() {
  return (
    <div>
      <Heading>Edit Recipe</Heading>
      <p>recipes.$recipeId.edit.tsx</p>
      <Form className="flex flex-col gap-4" action="edit" method="post">
        <Input label="Name" type="text" name="name" />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}
