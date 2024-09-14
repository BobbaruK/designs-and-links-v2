import { IconButton } from "@/components/button-icon";
import { CustomAlert } from "@/components/custom-alert";
import { CustomCardContent } from "@/components/custom-card-content";
import { Card, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getLicenseBySlug } from "@/lib/data/dl";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { TbLicense } from "react-icons/tb";
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
    <CardHeader className="border-b border-b-secondary">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">
          {!license ? `License: ${slug}` : license?.name}
        </h1>
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
          <CustomAlert title={"Error!"} asset="license" variant="destructive" />
        </>
      ) : (
        <>
          <Card>
            {header}

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <CustomCardContent
                form={<EditLicense license={license} />}
                label={license?.name}
                icon={<TbLicense size={320} />}
              />
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
