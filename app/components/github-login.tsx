import type { SupabaseOutletContext } from "~/supabase/use-get-supabase"
import { Github } from "lucide-react"
import { useOutletContext } from "@remix-run/react"
import { Button } from "./ui/button"
// import { useToast } from '~/components/ui/use-toast';

export function GithubLogin() {
  const { supabase, domainUrl } = useOutletContext<SupabaseOutletContext>()
  // TODO: const { toast } = useToast();

  const handleSignIn = async () => {
    console.log("Sign in with Github", domainUrl)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${domainUrl}/auth/callback`,
      },
    })

    if (error) {
      console.log("Sign in ", error)
      //   toast({
      //     variant: "destructive",
      //     description: `Error occured: ${error}`,
      //   })
    }
  }

  return (
    <Button
      className="p-4 relative w-full flex gap-4 items-center"
      onClick={handleSignIn}
    >
      <Github className="h-4 w-4" /> Login with Github
    </Button>
  )
}
