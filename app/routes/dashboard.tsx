import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { Database, Tables } from "types/supabase";

export async function loader({ request }: LoaderFunctionArgs) {
  const response = new Response();

  const supabaseClient = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response }
  );
  const { data } = await supabaseClient.from("Recipe").select();

  return json(
    { data },
    {
      headers: response.headers,
    }
  );
}

type Recipe = Database["public"]["Tables"]["Recipe"]["Row"];

export default function Dashboard() {
  const { data } = useLoaderData<{ data: Recipe[] }>();

  return (
    <>
      <h1>Dashboard</h1>
      <ul>
        {data.map((recipe: Recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </>
  );
}
