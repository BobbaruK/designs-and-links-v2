import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { CustomAvatar } from "@/components/custom-avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { IoArrowBackCircleSharp } from "react-icons/io5";

interface Props {
  params: {
    userId: string;
  };
}

const ProfilePage = async ({ params: { userId } }: Props) => {
  const currUser = await currentUser();

  const user = await getUserById(userId);

  return (
    <div className="container flex flex-col gap-6">
      {!user ? (
        <>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">User: {userId}</h1>
            <IconButton
              icon={<IoArrowBackCircleSharp size={25} />}
              href={"/"}
              label={"Back to home"}
            />
          </div>
          <CustomAlert
            title={"Error!"}
            description={`Seems like the user that you are looking for does not exist.`}
            variant="destructive"
          />
        </>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-6">
              <h1 className="text-4xl font-bold">
                {user.name || user.email}{" "}
                <small className="text-sm">({user.role})</small>
              </h1>
              {(currUser?.role === "ADMIN" || user.id === currUser?.id) && (
                <div className="ms-auto flex items-center justify-center gap-4">
                  <IconButton
                    icon={<CiEdit size={25} />}
                    href={
                      currUser?.role === "ADMIN"
                        ? `/admin/users/${userId}`
                        : `/settings`
                    }
                    label={"Edit form validation"}
                  />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex gap-4">
            <CustomAvatar image={user.image} className="h-40 w-40" />
            <div>
              <p>
                Email:{" "}
                <Link
                  href={`mailto:${user.email}`}
                  className="underline underline-offset-2"
                >
                  {user.email}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfilePage;
