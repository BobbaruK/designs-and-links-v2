import { IconButton } from "@/components/button-icon";
import { CustomAlert } from "@/components/custom-alert";
import { CustomCardContent } from "@/components/custom-card-content";
import { Card, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getLandingPageTypeBySlug } from "@/lib/data/dl";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { LuFileType2 } from "react-icons/lu";
import { EditLandingPageType } from "./edit-landing-page-type";

interface Props {
  params: {
    slug: string;
  };
}

const EditLandingPageTypePage = async ({ params: { slug } }: Props) => {
  const user = await currentUser();

  const lpType = await getLandingPageTypeBySlug(slug);

  const header = (
    <CardHeader className="border-b border-b-secondary">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">
          {!lpType ? `Landing page type: ${slug}` : lpType?.name}
        </h1>
        <IconButton
          icon={<IoArrowBackCircleSharp size={25} />}
          href={"/lp-type"}
          label={"Back to landing page types"}
        />
      </div>
    </CardHeader>
  );

  return (
    <div className="container flex flex-col gap-6">
      {!lpType ? (
        <>
          <Card>{header}</Card>
          <CustomAlert
            title={"Error!"}
            asset="landing page type"
            variant="destructive"
          />
        </>
      ) : (
        <>
          <Card>
            {header}

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <CustomCardContent
                form={<EditLandingPageType lpType={lpType} />}
                label={lpType?.name}
                icon={<LuFileType2 size={320} />}
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

export default EditLandingPageTypePage;
