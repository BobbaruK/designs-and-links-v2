import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUserById } from "@/lib/data";
import { getUserAvatars } from "@/lib/data/dl";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { RiProfileFill } from "react-icons/ri";
import { AdminUserEdit } from "./admin-user-edit";

interface Props {
  params: {
    userId: string;
  };
}

const AdminUserPage = async ({ params: { userId } }: Props) => {
  const user = await getUserById(userId);

  const avatars = await getUserAvatars();

  return (
    <div className="container flex flex-col gap-6">
      {!user ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">User: {userId}</h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/admin/users"}
                  label={"Back to form validations"}
                />
              </div>
            </CardHeader>
          </Card>
          <CustomAlert
            title={"Error!"}
            description={`Seems like the user that you are looking for does not exist.`}
            variant="destructive"
          />
        </>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-4xl font-bold">
                User: {user.name || user.email}
              </h1>
              <div className="ms-auto flex items-center justify-center gap-4">
                <IconButton
                  icon={<RiProfileFill size={25} />}
                  href={`/profile/${user.id}`}
                  label={"Go to users profile"}
                />
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/admin/users"}
                  label={"Back to users"}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <AdminUserEdit user={user} avatars={avatars} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminUserPage;
