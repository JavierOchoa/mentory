import { UserData } from "@/types";
import { createClient } from "@/utils/supabase/client";

export async function handleBecomeInstructor(userData: UserData) {
  const supabase = createClient();
  if (!userData) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from("profiles")
    .update({
      role: userData.role === "instructor" ? "student" : "instructor",
    })
    .eq("id", user.id);

  if (error) {
    console.error("Error updating role:", error.message);
    return;
  }

  return;
}
