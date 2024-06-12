import { RecipeCard } from "~/components/recipe-card"
import { Heading } from "~/components/ui/heading"

const RECIPES = [
  {
    id: 1,
    image:
      "https://images.matprat.no/86kt2azrjq-related/mobile/matprat_salatbowl_med_marinert_tofu_og_s%C3%B8tpotet_3.jpg",
    title: "Buddha bowl",
    isFavorite: true,
    rating: 4.5,
    time: 30,
    difficulty: 1,
    description: "Denne retten er en vegetarisk salatbowl med tofu.",
  },
  {
    id: 2,
    image: "https://images.matprat.no/yth37d3ra3-related/mobile",
    title: "Panzanella",
    isFavorite: false,
    rating: 3.5,
    time: 45,
    difficulty: 2,
    description: "Panzenella er en italiensk brødsalat.",
  },
]

export default function Recipes() {
  return (
    <div>
      <Heading>Recipes</Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {RECIPES.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            image={recipe.image}
            href={`/recipes/${recipe.id}`}
            title={recipe.title}
            isFavorite={recipe.isFavorite}
            rating={recipe.rating}
            time={recipe.time}
            difficulty={recipe.difficulty}
            description="..."
          />
        ))}
      </div>
    </div>
  )
}
