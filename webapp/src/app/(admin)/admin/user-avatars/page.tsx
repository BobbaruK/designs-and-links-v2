import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUserAvatars } from "@/lib/data/dl";
import { IoAddCircleSharp, IoArrowBackCircleSharp } from "react-icons/io5";
import { columns } from "./columns";

const AdminUserAvatar = async () => {
  const userAvatars = await getUserAvatars();

  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">User Avatars</h1>
            <div className="flex gap-4">
              <IconButton
                icon={<IoAddCircleSharp size={25} />}
                href={"/admin/user-avatars/add"}
                label={"Add avatar"}
              />
              <IconButton
                icon={<IoArrowBackCircleSharp size={25} />}
                href={"/admin"}
                label={"Back to admin area"}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0"></CardContent>
      </Card>
      <DataTable columns={columns} data={userAvatars!} columnVisibilityObj={{}} />
    </div>
  );
};

export default AdminUserAvatar;
