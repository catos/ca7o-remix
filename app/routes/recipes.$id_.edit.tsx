import { PrismaClient } from "@prisma/client"
import { Form, useLoaderData } from "@remix-run/react"
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node"
import invariant from "tiny-invariant"
import Heading from "~/components/ui/heading"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Button } from "~/components/ui/button"
import { updateRecipe } from "~/data/recipe-service"

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "Missing id param")

  const prisma = new PrismaClient()
  const recipe = await prisma.recipe.findUnique({
    where: { id: Number(params.id) },
  })

  if (!recipe) {
    throw new Response("Not found", { status: 404 })
  }

  return json({ recipe })
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.id, "Missing id param")

  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await updateRecipe(Number(params.id), updates)

  return redirect(`/recipes/${params.id}`)
}

export default function Edit() {
  const { recipe } = useLoaderData<typeof loader>()

  return (
    <div className="flex justify-center">
      <section className="rounded-md w-full lg:w-2/3 p-2">
        <Heading className="mb-4">Edit Recipe</Heading>
        <Form
          key={recipe.id}
          id="recipe-form"
          method="post"
          className="flex flex-col gap-4"
        >
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              aria-label="title"
              id="title"
              name="title"
              type="text"
              defaultValue={recipe.title}
            />
          </div>

          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              aria-label="image"
              id="image"
              name="image"
              type="text"
              defaultValue={recipe.image}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={recipe.description || ""}
              placeholder="Description here."
            />
          </div>

          <div>
            <Label htmlFor="ingredients">Ingredients</Label>
            <Textarea
              id="ingredients"
              name="ingredients"
              defaultValue={recipe.ingredients || ""}
              placeholder="ingredients here."
              rows={15}
            />
          </div>

          <div>
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              name="instructions"
              defaultValue={recipe.instructions || ""}
              placeholder="instructions here."
              rows={15}
            />
          </div>

          <div className="flex items-center justify-between">
            <Button variant="secondary" type="button">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </section>
    </div>
  )
}
