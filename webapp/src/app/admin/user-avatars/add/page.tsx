import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AdminUserAvatarAdd } from "./admin-user-avatar-add";

const AdminAddAvatar = () => {
  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Add avatar</h1>
            <IconButton
              icon={<IoArrowBackCircleSharp size={25} />}
              href={"/admin/user-avatars"}
              label={"Back to user avatars"}
            />
          </div>
        </CardHeader>
        <CardContent>
          <AdminUserAvatarAdd />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAddAvatar;
