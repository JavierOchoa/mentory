"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { UserData } from "@/types";
import { handleBecomeInstructor } from "@/components/handle-become-instructor";

export default function Create() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const supabase = createClient();
  const updateRole = async () => {
    if (!userData) return;

    handleBecomeInstructor(userData);

    setUserData(
      (prev) =>
        prev && {
          ...prev,
          role: userData.role === "instructor" ? "student" : "instructor",
        },
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("name, avatar, role")
        .eq("id", user.id)
        .single();

      if (profile) {
        setUserData({
          name: profile.name,
          avatar: profile.avatar,
          role: profile.role,
          email: user.email ?? "",
        });
      }
    };

    fetchData();
  }, [supabase]);

  if (userData === null) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center gap-4 text-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (userData?.role === "student") {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-semibold">You're not an instructor yet</h2>
        <p className="text-muted-foreground max-w-md">
          Become an instructor to start creating and sharing courses with the
          Mentory community.
        </p>
        <Button className="font-semibold" onClick={updateRole}>
          Become an instructor
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center gap-4 text-center">
      <p className="text-muted-foreground">
        You currently don't have any content
      </p>
      <Link
        href="/create/new"
        className={buttonVariants({ variant: "default" })}
      >
        Create new content
      </Link>
    </div>
  );
}
