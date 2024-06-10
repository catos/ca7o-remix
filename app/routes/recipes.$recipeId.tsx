import { LoaderFunctionArgs, json } from "@remix-run/node"
import { Form, Link, useLoaderData } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import Heading from "~/components/ui/heading"

export function loader({ params }: LoaderFunctionArgs) {
  return json({ recipeId: params.recipeId })
}

export default function Recipe() {
  const { recipeId } = useLoaderData<typeof loader>()
  return (
    <div>
      <Heading>Recipe</Heading>
      <p>recipes.$recipeId.tsx, id: {recipeId}</p>

      <Link to={`/recipes/${recipeId}/edit`}>Edit</Link>

      <Form
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
      </Form>
    </div>
  )
}
