import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { ReactNode } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AddLicense } from "./add-license";
import { CustomCardContent } from "@/components/custom-card-content";
import { TbLicense } from "react-icons/tb";

const AddLicensePage = async () => {
  const user = await currentUser();

  const header: ReactNode = (
    <CardHeader className="border-b border-b-secondary">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Add License</h1>
        <IconButton
          icon={<IoArrowBackCircleSharp size={25} />}
          href={"/license"}
          label={"Back to licenses"}
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
              form={<AddLicense />}
              label={"License"}
              icon={<TbLicense size={320} />}
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

export default AddLicensePage;
