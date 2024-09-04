import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  href: string;
  label: string;
}

export const IconButton = ({ icon, href, label }: Props) => {
  return (
    <Button asChild size={"icon"}>
      <Link href={href}>
        {icon}
        <span className="sr-only">{label}</span>
      </Link>
    </Button>
  );
};
