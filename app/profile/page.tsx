"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/theme-switcher";

type UserData = {
  name: string;
  avatar: string;
  role: string;
  email: string;
};

export default function UserSettings() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const supabase = createClient();
  const handleBecomeInstructor = async () => {
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

    setUserData((prev) => prev && { ...prev, role: "instructor" });
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

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col align-center gap-y-6 md:w-full">
      <div className="flex flex-row justify-between">
        <h1 className="block sm:hidden text-4xl lg:text-3xl font-bold">
          Profile
        </h1>
        <ThemeSwitcher />
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl lg:text-3xl font-bold">{userData.name}</h2>
          <p className="text-muted-foreground capitalize">{userData.role}</p>
        </div>
        <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
          <Image
            src={userData.avatar}
            alt="User Avatar"
            fill
            className="rounded-full border object-cover"
          />
        </div>
      </div>

      <div className="w-full flex items-center gap-4">
        <p className="text-base font-medium">Email:</p>
        <div className="border rounded-xl py-2 px-4 bg-muted w-full md:w-1/3">
          <p className="text-base">{userData.email}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button>Update Profile</Button>
        <Button variant="outline" onClick={handleBecomeInstructor}>
          {userData.role === "instructor"
            ? "Become Student"
            : "Become Instructor"}
        </Button>
      </div>
    </div>
  );
}
