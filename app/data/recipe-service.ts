import { PrismaClient, Recipe } from "@prisma/client"

export async function updateRecipe(id: number, updates: Partial<Recipe>) {
  const prisma = new PrismaClient()

  return prisma.recipe.update({
    where: { id },
    data: updates,
  })
}
