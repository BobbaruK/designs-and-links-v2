import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const AdminAddUserPage = () => {
  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Add User</h1>
            <IconButton
              icon={<IoArrowBackCircleSharp size={25} />}
              href={"/admin/users"}
              label={"Back to users"}
            />
          </div>
        </CardHeader>
        <CardContent>
          add user form here
          {/* <AddUser roles={roles as Role[]} avatars={avatars as Avatar[]} /> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAddUserPage;
