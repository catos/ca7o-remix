import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export function loader({ params }: LoaderFunctionArgs) {
  return json({ recipeId: params.recipeId })
}

export default function Recipe() {
  const { recipeId } = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>Recipe</h1>
      <p>recipes.$recipeId.tsx</p>
      <p>Recipe id: {recipeId}</p>
    </div>
  )
}
