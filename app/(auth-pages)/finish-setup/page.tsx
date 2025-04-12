'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function FinishSetupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(
    "https://www.gravatar.com/avatar/?d=mp"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
  
    if (userError) {
      console.error("Error fetching user:", userError.message);
      return;
    }
  
    if (!user) {
      console.error("No user found.");
      return;
    }
  
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ name: name, avatar: avatarUrl })
      .eq('id', user.id);
  
    if (updateError) {
      console.error("Error updating profile:", updateError.message);
      return;
    }
  
    router.push('/protected');
  };
  

  return (
    <div className="bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">Finish Setting Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex justify-center">
              <Image
                src={avatarUrl}
                alt="Avatar preview"
                width={64}
                height={64}
                className="rounded-full border"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Name</label>
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Avatar URL</label>
              <Input
                type="text"
                placeholder="https://..."
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
            </div>



            <Button type="submit" className="w-full">
              Save and Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
