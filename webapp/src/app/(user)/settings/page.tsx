import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { RiProfileFill } from "react-icons/ri";
import { SettingsForm } from "./settings-form";
import { getUserAvatars } from "@/lib/data/dl";

const SettingsPage = async () => {
  const user = await currentUser();

  const avatars = await getUserAvatars();

  return (
    <div className="container">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <h1 className="text-4xl font-bold">Settings</h1>
          <IconButton
            icon={<RiProfileFill size={25} />}
            href={`/profile/${user?.id}`}
            label={"Go to users profile"}
          />
        </CardHeader>
        <CardContent>
          <SettingsForm avatars={avatars} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
