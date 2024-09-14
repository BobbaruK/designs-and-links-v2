import { CustomAvatar } from "@/components/custom-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  link: string;
  name: string;
  length: number;
  image?: string | null;
}

export const NameCell = ({ link, name, length, image }: Props) => {
  return (
    <div className="flex flex-row items-center justify-start gap-0">
      <Button
        asChild
        variant={"link"}
        className={cn(
          "flex flex-row items-center justify-start gap-2 text-foreground",
        )}
      >
        <Link href={link} className="flex items-center gap-2">
          {image && <CustomAvatar image={image} />}
          {name}
        </Link>
      </Button>

      {length > 0 && <Badge variant="default">{length}</Badge>}
    </div>
  );
};
