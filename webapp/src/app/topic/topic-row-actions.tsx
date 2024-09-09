import { deleteTopic } from "@/actions/dl";
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
import { DL_Topic } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  topic: DL_Topic;
}

const TopicRowActions = ({ topic }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userRole = useCurrentRole();

  const onDelete = () => {
    deleteTopic(topic.id).then((data) => {
      if (data.error) {
        toast.error(
          <div className="">
            Could not delete topic
            <code>{topic.name}</code>.
          </div>,
        );
      }
      if (data.success) {
        toast.success(
          <div>
            Topic
            <code>{topic.name}</code>
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
        label={topic?.name}
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
                <Link href={`/topic/${topic.slug}/edit`}>
                  <span>
                    Edit topic <strong>{topic?.name}</strong>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                <span>
                  Delete topic <strong>{topic?.name}</strong>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(topic.id);

              toast.info(`Copied ${topic.name}'s ID`, {
                description: topic.id,
              });
            }}
          >
            <span>
              Copy <strong>{topic.name}</strong> ID
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TopicRowActions;
