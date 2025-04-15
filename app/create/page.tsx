import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"

export default function Create() {
    return (
        <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-muted-foreground">You currently don't have any content</p>
            <Link href="/create/new" className={buttonVariants({ variant: "default" })}>Create new content</Link>
        </div>
    )
}