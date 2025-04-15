import Hero from "@/components/hero";
import Header from "@/components/header";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <Hero />
    </div>
  );
}
