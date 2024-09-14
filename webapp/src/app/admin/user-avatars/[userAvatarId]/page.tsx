import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUserAvatarById } from "@/lib/data/dl";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AdminUserAvatarEdit } from "./admin-user-avatar-edit";

interface Props {
  params: {
    userAvatarId: string;
  };
}

const AdminUserAvatar = async ({ params: { userAvatarId } }: Props) => {
  const avatar = await getUserAvatarById(userAvatarId);

  return (
    <div className="container flex flex-col gap-6">
      {!avatar ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">
                  User avatar: {userAvatarId}
                </h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/admin/user-avatars"}
                  label={"Back to user avatars"}
                />
              </div>
            </CardHeader>{" "}
          </Card>
          <CustomAlert
            title={"Error!"}
            description={`Seems like the user avatar that you are looking for does not exist.`}
            variant="destructive"
          />
        </>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-4xl font-bold">User avatar {avatar.name}</h1>
              <div className="ms-auto flex items-center justify-center gap-4">
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/admin/user-avatars"}
                  label={"Back to user avatars"}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <AdminUserAvatarEdit avatar={avatar} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminUserAvatar;
