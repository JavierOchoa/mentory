import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { ThemeSwitcher } from "./theme-switcher";
import { LogOut, User } from "lucide-react";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <div className="flex items-center justify-center gap-4">
      <ThemeSwitcher />
      <span className="hidden sm:block">Hey, <Link href="/protected" className="cursor-pointer">{user.email}</Link>!</span>
      <Link className={buttonVariants({className:"block sm:hidden"})} href="/protected">
        <User /> Profile
      </Link>
      <form action={signOutAction}>
        <Button className="hidden sm:block" type="submit" variant={"outline"}>
          Sign out
        </Button>
        <Button className="block sm:hidden" type="submit" variant={"secondary"}>
          <LogOut />
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <ThemeSwitcher />
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
