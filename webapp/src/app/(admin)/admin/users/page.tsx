import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUsers } from "@/lib/data/user";
import { IoAddCircleSharp, IoArrowBackCircleSharp } from "react-icons/io5";
import { columns } from "./columns";

const AdminUsersPage = async () => {
  const users = await getUsers();

  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Users</h1>
            <div className="flex gap-4">
              <IconButton
                icon={<IoAddCircleSharp size={25} />}
                href={"/admin/users/add"}
                label={"Add user"}
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
      <DataTable columns={columns} data={users!} columnVisibilityObj={{}} />
    </div>
  );
};

export default AdminUsersPage;
