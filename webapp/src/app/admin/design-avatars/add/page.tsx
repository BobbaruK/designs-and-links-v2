import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AdminDesignAvatarsAdd } from "./design-avatar-add";

const AdminAddDesignAvatar = () => {
  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Add design avatar</h1>
            <IconButton
              icon={<IoArrowBackCircleSharp size={25} />}
              href={"/admin/design-avatars"}
              label={"Back to design avatars"}
            />
          </div>
        </CardHeader>
        <CardContent>
          <AdminDesignAvatarsAdd />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAddDesignAvatar;
