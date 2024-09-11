import { deleteDesign, deleteSubDesign } from "@/actions/dl/designs";
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
import { Prisma } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  design: Prisma.DL_DesignGetPayload<{
    include: {
      createdBy: {
        omit: {
          password: true;
        };
      };
      updatedBy: {
        omit: {
          password: true;
        };
      };
      subDesigns: {
        include: {
          createdBy: {
            omit: {
              password: true;
            };
          };
          updatedBy: {
            omit: {
              password: true;
            };
          };
        };
      };
    };
  }> &
    Prisma.DL_SubDesignGetPayload<{
      include: {
        createdBy: {
          omit: {
            password: true;
          };
        };
        updatedBy: {
          omit: {
            password: true;
          };
        };
      };
    }>;
}

const DesignRowActions = ({ design }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userRole = useCurrentRole();

  const onDelete = () => {
    if (design.DL_DesignId) {
      deleteSubDesign(design.id).then((data) => {
        if (data.error) {
          toast.error(
            <div className="">
              Could not delete sub design
              <code>{design.name}</code>.
            </div>,
          );
        }
        if (data.success) {
          toast.success(
            <div>
              Sub Design
              <code>{design.name}</code>
              deleted!
            </div>,
          );
        }
        revalidate();
      });

      return;
    }

    deleteDesign(design.id).then((data) => {
      if (data.error) {
        toast.error(
          <div className="">
            Could not delete design
            <code>{design.name}</code>.
          </div>,
        );
      }
      if (data.success) {
        toast.success(
          <div>
            Design
            <code>{design.name}</code>
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
        label={design?.name}
        asset={"design"}
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
                <Link href={`/design/${design.slug}/edit`}>
                  <span>
                    Edit design <strong>{design?.name}</strong>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                <span>
                  Delete design <strong>{design?.name}</strong>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(design.id);

              toast.info(`Copied ${design.name}'s ID`, {
                description: design.id,
              });
            }}
          >
            <span>
              Copy <strong>{design.name}</strong> ID
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DesignRowActions;
