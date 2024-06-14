import { ActionFunctionArgs } from "@remix-run/node"
import { redirect } from "@remix-run/react"

// TODO: Is there a better way to handle/prevent get requests to this route ?
export function loader() {
    return redirect("/recipes")
}

export async function action({ params }: ActionFunctionArgs) {
    console.log("destroying recipe", params.recipeId)
    return redirect("/recipes")
}
