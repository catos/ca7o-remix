import { LoaderFunctionArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/react"
import { GithubLogin } from "~/components/github-login"
import { Heading } from "~/components/ui/heading"
import { getSupabase } from "~/supabase/supabase.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { headers, session } = await getSupabase({
    request,
  })

  if (session) {
    return redirect("/", { headers })
  }

  return json({ success: true }, { headers })
}

export default function Login() {
  return (
    <div className="flex justify-center">
      <section className="rounded-md sm:w-2/3 md:w-1/2 bg-white p-4 mt-8">
        <form className="relative flex flex-col gap-4 p-4 mb-4">
          <Heading className="mb-4">Logg inn</Heading>

          {/* <Input required id="email" type="email" name="email" label="E-post" />

          <Input
            required
            id="password"
            type="password"
            name="password"
            label="Passord"
          /> */}

          {/* TODO: Implement ui/checkbox */}
          {/* <div className="flex justify-between py-2">
          <Link href="/auth/forgot-password">Glemt passord?</Link>

          <span className="flex items-center gap-2">
            <Checkbox id="remember" name="remember" />
            <Label htmlFor="remember">Husk meg</Label>
          </span>
        </div> */}

          {/* <Button>Logg inn</Button>
          <Button variant="outline">Registrer deg</Button>

          <p className="pt-4 italic text-base text-foreground/60">
            Denne site er så eksklusiv at du må kjenne fyren som lager den for å
            få tilgang... Sorry!
          </p> */}

          <GithubLogin />
        </form>
      </section>
    </div>
  )
}
