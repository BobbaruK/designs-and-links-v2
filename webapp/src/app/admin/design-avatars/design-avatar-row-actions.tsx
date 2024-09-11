import { adminDeleteDesignAvatar } from "@/actions/dl";
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
import { DL_DesignAvatar } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  designAvatar: DL_DesignAvatar;
}

const AdminDesignAvatarRowActions = ({ designAvatar }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userRole = useCurrentRole();

  const onDelete = () => {
    adminDeleteDesignAvatar(designAvatar.id).then((data) => {
      if (data.error) {
        console.log(data.error);
        toast.error(
          <div className="">
            Could not delete brand logo
            <code>{designAvatar.name}</code>.
          </div>,
        );
      }
      if (data.success) {
        toast.success(
          <div>
            Brand logo
            <code>{designAvatar.name}</code>
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
        label={designAvatar.name}
        asset={"brand logos"}
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
                <Link href={`/admin/design-avatars/${designAvatar.id}`}>
                  <span>
                    Edit brand logo <strong>{designAvatar.name}</strong>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                <span>
                  Delete brand logo <strong>{designAvatar.name}</strong>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(designAvatar.id);

              toast.info(`Copied ${designAvatar.name}'s ID`, {
                description: designAvatar.id,
              });
            }}
          >
            <span>
              Copy <strong>{designAvatar.name}</strong> ID
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AdminDesignAvatarRowActions;
