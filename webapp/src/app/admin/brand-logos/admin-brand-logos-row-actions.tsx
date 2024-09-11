import { adminDeleteBrandLogo } from "@/actions/dl";
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
import { DL_BrandLogo } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  brandLogo: DL_BrandLogo;
}

const AdminBrandLogosRowActions = ({ brandLogo }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userRole = useCurrentRole();

  const onDelete = () => {
    adminDeleteBrandLogo(brandLogo.id).then((data) => {
      if (data.error) {
        toast.error(
          <div className="">
            Could not delete brand logo
            <code>{brandLogo.name}</code>.
          </div>,
        );
      }
      if (data.success) {
        toast.success(
          <div>
            Brand logo
            <code>{brandLogo.name}</code>
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
        label={brandLogo.name}
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
                <Link href={`/admin/brand-logos/${brandLogo.id}`}>
                  <span>
                    Edit brand logo <strong>{brandLogo.name}</strong>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                <span>
                  Delete brand logo <strong>{brandLogo.name}</strong>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(brandLogo.id);

              toast.info(`Copied ${brandLogo.name}'s ID`, {
                description: brandLogo.id,
              });
            }}
          >
            <span>
              Copy <strong>{brandLogo.name}</strong> ID
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AdminBrandLogosRowActions;
