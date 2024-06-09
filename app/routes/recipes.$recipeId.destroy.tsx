import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export function loader({ params }: LoaderFunctionArgs) {
  return json({ recipeId: params.recipeId })
}

export default function DeleteRecipe() {
  const { recipeId } = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>Destroy recipe</h1>
      <p>Recipe id: {recipeId}</p>
    </div>
  )
}
