import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { PrismaClient } from "@prisma/client"
import {
  BookPlusIcon,
  CookingPotIcon,
  PrinterIcon,
  StarIcon,
} from "lucide-react"
import Link from "~/components/ui/link"
import Image from "~/components/image"
import Heading from "~/components/ui/heading"
import Tooltip from "~/components/ui/tooltip"
import Markdown from "~/components/recipe/markdown"

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
    <div className="flex flex-col gap-4">
      <section className="relative">
        <Link
          className="absolute top-2 right-2 no-underline font-bold opacity-60 bg-background rounded-full p-2"
          to={`/recipes/${recipe.id}/edit`}
        >
          <CookingPotIcon />
        </Link>
        <Image
          className="max-h-64 sm:max-h-96 object-cover"
          src={recipe.image}
          alt={recipe.title}
        />
      </section>

      <section className="flex flex-col">
        <Heading as="h1" className="px-4 m-0 text-center font-semibold">
          {recipe.title}
        </Heading>
        <div className="py-4 flex gap-2 justify-center">
          <span className="rounded-full px-3 text-sm bg-primary">Fisk</span>
          <span className="rounded-full px-3 text-sm bg-primary">Enkel</span>
          <span className="rounded-full px-3 text-sm bg-primary">Sunn</span>
        </div>
        <div className="pb-4 flex gap-4 justify-center">
          <Tooltip toggler={<StarIcon />} text="Legg til som favoritt" />
          <Tooltip
            toggler={<BookPlusIcon />}
            text="Legg til oppskrift i meny"
          />
          <Tooltip toggler={<PrinterIcon />} text="Skriv ut" />
        </div>
      </section>

      <div className="flex flex-col gap-4 sm:flex-row">
        <section className="rounded-md sm:w-1/2 md:w-5/12 bg-foreground/10 p-4">
          <Heading as="h2" className="uppercase text-foreground/50 text-lg">
            Ingrendienser
          </Heading>
          <Markdown>{recipe.ingredients}</Markdown>
        </section>

        <section className="rounded-md sm:w-1/2 md:w-7/12 bg-foreground/10 p-4">
          <Heading as="h2" className="uppercase text-foreground/50 text-lg">
            Slik gjør du
          </Heading>
          <Markdown>{recipe.instructions}</Markdown>
        </section>
      </div>
    </div>
  )
}
