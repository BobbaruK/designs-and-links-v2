import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getDesignAvatarById } from "@/lib/data/dl";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AdminDesignAvatarEdit } from "./admin-design-avatar-edit";

interface Props {
  params: {
    designAvatarId: string;
  };
}

const AdminDesignAvatarPage = async ({ params: { designAvatarId } }: Props) => {
  const designAvatar = await getDesignAvatarById(designAvatarId);

  return (
    <div className="container flex flex-col gap-6">
      {!designAvatar ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">
                  Design avatar: {designAvatarId}
                </h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/admin/design-avatars"}
                  label={"Back to design avatars"}
                />
              </div>
            </CardHeader>
          </Card>
          <CustomAlert
            title={"Error!"}
            description={`Seems like the design avatar that you are looking for does not exist.`}
            variant="destructive"
          />
        </>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-4xl font-bold">
                Design avatar {designAvatar.name}
              </h1>
              <div className="ms-auto flex items-center justify-center gap-4">
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/admin/design-avatars"}
                  label={"Back to designs"}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <AdminDesignAvatarEdit brandLogo={designAvatar} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDesignAvatarPage;
