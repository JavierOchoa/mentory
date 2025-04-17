import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, Plus, Bookmark, User } from "lucide-react";

export default function BottomNav() {
  return (
    <div className="block sm:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-muted px-6 py-3 flex justify-between items-center z-50">
      <Link href="/">
        <Home className="w-6 h-6" />
      </Link>
      <Link href="/search">
        <Search className="w-6 h-6" />
      </Link>
      <Link href="/create">
        <Plus className="w-6 h-6" />
      </Link>
      <Link href="/saved">
        <Bookmark className="w-6 h-6" />
      </Link>
      <Link href="/profile">
        <User className="w-6 h-6" />
      </Link>
    </div>
  );
}
