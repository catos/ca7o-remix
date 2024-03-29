import { useOutletContext } from "@remix-run/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase";

export default function Login() {
  const { supabase } = useOutletContext<{
    supabase: SupabaseClient<Database>;
  }>();

  const handleEmailLogin = async () => {
    await supabase.auth.signInWithPassword({
      email: "",
      password: "",
    });
  };

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <button onClick={handleEmailLogin}>Email Login</button>
      <button onClick={handleGitHubLogin}>GitHub Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
