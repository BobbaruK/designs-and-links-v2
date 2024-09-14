import { IconButton } from "@/components/button-icon";
import { CustomAlert } from "@/components/custom-alert";
import { CustomCardContent } from "@/components/custom-card-content";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { ReactNode } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { LuFileType2 } from "react-icons/lu";
import { AddLandingPageType } from "./add-landing-page-type";

const AddLandingPageTypePage = async () => {
  const user = await currentUser();

  const header: ReactNode = (
    <CardHeader className="border-b border-b-secondary">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Add Landing Page Type</h1>
        <IconButton
          icon={<IoArrowBackCircleSharp size={25} />}
          href={"/lp-type"}
          label={"Back to landing page type"}
        />
      </div>
    </CardHeader>
  );

  return (
    <div className="container flex flex-col gap-6">
      {user?.role === "EDITOR" || user?.role === "ADMIN" ? (
        <>
          <Card>
            {header}
            <CustomCardContent
              form={<AddLandingPageType />}
              label={"Landing Page Type"}
              icon={<LuFileType2 size={320} />}
            />
          </Card>
        </>
      ) : (
        <>
          <Card>{header}</Card>
          <CustomAlert
            title={"Heads up!"}
            description={"You do not have permission to access this content"}
            variant="destructive"
          />
        </>
      )}
    </div>
  );
};

export default AddLandingPageTypePage;
