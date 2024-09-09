import { deleteLandingPageType } from "@/actions/dl";
import { revalidate } from "@/actions/reavalidate";
import { DeleteDialog } from "@/components/delete-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentRole } from "@/hooks/use-current-role";
import { DL_LandingPageType } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  lpType: DL_LandingPageType;
}

const LandingPageTypeRowActions = ({ lpType }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userRole = useCurrentRole();

  const onDelete = () => {
    deleteLandingPageType(lpType.id).then((data) => {
      if (data.error) {
        toast.error(
          <div className="">
            Could not delete topic
            <code>{lpType.name}</code>.
          </div>,
        );
      }
      if (data.success) {
        toast.success(
          <div>
            Topic
            <code>{lpType.name}</code>
            deleted!
          </div>,
        );
      }
      revalidate();
    });
  };

  return (
    <>
      <DeleteDialog
        label={lpType?.name}
        asset={"topic"}
        onDelete={onDelete}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        showTrigger={false}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {userRole !== "USER" && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/lp-type/${lpType.slug}/edit`}>
                  <span>
                    Edit topic <strong>{lpType?.name}</strong>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                <span>
                  Delete topic <strong>{lpType?.name}</strong>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(lpType.id);

              toast.info(`Copied ${lpType.name}'s ID`, {
                description: lpType.id,
              });
            }}
          >
            <span>
              Copy <strong>{lpType.name}</strong> ID
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LandingPageTypeRowActions;
