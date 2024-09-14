import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getLicenseBySlug } from "@/lib/data/dl";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { EditLicense } from "./edit-license";

interface Props {
  params: {
    slug: string;
  };
}

const EditLicensePage = async ({ params: { slug } }: Props) => {
  const user = await currentUser();

  const license = await getLicenseBySlug(slug);

  const header = (
    <CardHeader>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">License: {license?.name}</h1>
        <IconButton
          icon={<IoArrowBackCircleSharp size={25} />}
          href={"/license"}
          label={"Back to License"}
        />
      </div>
    </CardHeader>
  );

  return (
    <div className="container flex flex-col gap-6">
      {!license ? (
        <>
          <Card>{header}</Card>
          <CustomAlert
            title={"Error!"}
            description={`Seems like the license that you are looking for does not exist.`}
            variant="destructive"
          />
        </>
      ) : (
        <>
          <Card>
            {header}

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <CardContent>
                <EditLicense license={license} />
              </CardContent>
            )}
          </Card>

          {user?.role !== "EDITOR" && user?.role !== "ADMIN" && (
            <CustomAlert
              title={"Heads up!"}
              description={"You do not have permission to access this content"}
              variant="destructive"
            />
          )}
        </>
      )}
    </div>
  );
};

export default EditLicensePage;
