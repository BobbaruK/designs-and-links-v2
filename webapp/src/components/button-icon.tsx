import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  href: string;
  label: string;
  onlyIcon?: boolean;
}

export const IconButton = ({ icon, href, label, onlyIcon = true }: Props) => {
  return (
    <Button asChild size={onlyIcon ? "icon" : "default"}>
      <Link href={href} className="flex gap-2">
        {icon}
        <span className={onlyIcon ? "sr-only" : ""}>{label}</span>
      </Link>
    </Button>
  );
};
