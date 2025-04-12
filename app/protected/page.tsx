'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({ role: userData.role === 'instructor' ? 'student' : 'instructor' })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating role:', error.message);
      return;
    }

    setUserData((prev) => prev && { ...prev, role: 'instructor' });
  };

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('name, avatar, role')
        .eq('id', user.id)
        .single();

      if (profile) {
        setUserData({
          name: profile.name,
          avatar: profile.avatar,
          role: profile.role,
          email: user.email ?? '',
        });
      }
    };

    fetchData();
  }, [supabase]);

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <p className="text-muted-foreground capitalize">{userData.role}</p>
        </div>
        <Image
          src={userData.avatar}
          alt="User Avatar"
          width={96}
          height={96}
          className="rounded-full border"
        />
      </div>
  
      <div className="w-full flex items-center gap-4">
        <p className="text-base font-medium">Email:</p>
        <div className="border rounded-xl p-4 bg-muted w-1/3">
          <p className="text-base">{userData.email}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button variant="outline">Update Profile</Button>
        <Button onClick={handleBecomeInstructor}>{userData.role === 'instructor' ? 'Become Student' : 'Become Instructor'}</Button>
      </div>
    </div>
  );  

}
