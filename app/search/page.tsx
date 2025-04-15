import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Brain, BadgeDollarSign, Code, Dumbbell, Clapperboard, BookA, Lightbulb, Laptop, Telescope } from "lucide-react";

export default function Search() {
    return (
        <div className="flex flex-col items-center gap-4">
            <Input type="search" placeholder="Search..." className="w-full max-w-md" />
            
            <div className="flex flex-wrap justify-center gap-2 w-full max-w-4xl lg:max-w-6xl">
                {[
                { icon: <Brain />, label: "Personal" },
                { icon: <BadgeDollarSign />, label: "Trading" },
                { icon: <Code />, label: "Technical" },
                { icon: <Dumbbell />, label: "Physical" },
                { icon: <Clapperboard />, label: "Creative" },
                { icon: <BookA />, label: "Academic" },
                { icon: <Lightbulb />, label: "Spiritual" },
                { icon: <Laptop />, label: "Software and Tools" },
                ].map((item, i) => (
                <Button
                    key={i}
                    className="flex-1 min-w-[48%] sm:min-w-[150px] md:min-w-[120px] lg:flex-none lg:w-auto"
                >
                    {item.icon}
                    <span>{item.label}</span>
                </Button>
                ))}
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                    <Telescope className="animate-pulse w-5 h-5"/>
                    <h3 className="text-2xl font-bold tracking-wide">Discover</h3>
                </div>
                <ScrollArea className="h-40 whitespace-nowrap ">
                    <div className="flex w-max gap-2 ">
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                    </div>
                    <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>
            </div>
            <div className="flex flex-col gap-2 w-full">
                    <h3 className="text-2xl font-bold tracking-wide">Personal</h3>
                <ScrollArea className="h-40 whitespace-nowrap ">
                    <div className="flex w-max gap-2 ">
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                    </div>
                    <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>
            </div>
            <div className="flex flex-col gap-2 w-full">
                    <h3 className="text-2xl font-bold tracking-wide">Creative</h3>
                <ScrollArea className="h-40 whitespace-nowrap ">
                    <div className="flex w-max gap-2 ">
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                        <Skeleton className="w-28 h-40" />
                    </div>
                    <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>
            </div>
        </div>
    )
}
