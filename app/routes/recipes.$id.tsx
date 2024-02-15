import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { PrismaClient } from "@prisma/client"

export async function loader({ params }: LoaderFunctionArgs) {
  const prisma = new PrismaClient()
  const data = await prisma.recipe.findUnique({
    where: { id: Number(params.id) },
  })

  return json({ data })
}

export default function Recipe() {
  const { data: recipe } = useLoaderData<typeof loader>()

  if (!recipe) return null

  return (
    <div>
      <h1 className="text-3xl font-bold">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>
      <p>{recipe.ingredients}</p>
      <p>{recipe.instructions}</p>
    </div>
  )
}
