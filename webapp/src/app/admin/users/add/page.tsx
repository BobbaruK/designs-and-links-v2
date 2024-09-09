import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AdminUserAdd } from "./admin-user-add";
import { getUserAvatars } from "@/lib/data/dl";

const AdminAddUserPage = async () => {
  const avatars = await getUserAvatars();
  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Add user</h1>
            <IconButton
              icon={<IoArrowBackCircleSharp size={25} />}
              href={"/admin/users"}
              label={"Back to users"}
            />
          </div>
        </CardHeader>
        <CardContent>
          <AdminUserAdd avatars={avatars} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAddUserPage;
