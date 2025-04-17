import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type SettingDataSection = {
  dataSection: string;
};

export default function SettingDataSection({
  dataSection,
}: SettingDataSection) {
  if (dataSection === "role") return;
  return (
    <div>
      <Link href={`/update/${dataSection}`}>
        <div className="flex flex-row w-full items-center justify-between -mt-2">
          <span className="text-muted-foreground">
            {dataSection.charAt(0).toUpperCase() + dataSection.slice(1)}
          </span>
          <ChevronRight className="text-muted-foreground" />
        </div>
      </Link>
      <Separator className="mt-2" />
    </div>
  );
}
