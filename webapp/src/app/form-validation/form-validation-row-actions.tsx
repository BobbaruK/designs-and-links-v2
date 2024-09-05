import { deleteFormValidation } from "@/actions/dl";
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
import { DL_FormValidation } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  formValidation: DL_FormValidation;
}

const FormValidationRowActions = ({ formValidation }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userRole = useCurrentRole();

  const onDelete = () => {
    deleteFormValidation(formValidation.id).then((data) => {
      if (data.error) {
        toast.error(
          <div className="">
            Could not delete form validation
            <code className="mx-1 text-nowrap rounded-md bg-secondary p-1 text-secondary-foreground">
              {formValidation.name}
            </code>
            .
          </div>,
        );
      }
      if (data.success) {
        toast.success(
          <div>
            Form validation
            <code className="mx-1 text-nowrap rounded-md bg-secondary p-1 text-secondary-foreground">
              {formValidation.name}
            </code>
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
        label={formValidation?.name}
        asset={"form validation"}
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
                <Link href={`/form-validation/${formValidation.slug}/edit`}>
                  <span>
                    Edit form validation <strong>{formValidation?.name}</strong>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                <span>
                  Delete form validation <strong>{formValidation?.name}</strong>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(formValidation.id);

              toast.info(`Copied ${formValidation.name}'s ID`, {
                description: formValidation.id,
              });
            }}
          >
            <span>
              Copy <strong>{formValidation.name}</strong> ID
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default FormValidationRowActions;
