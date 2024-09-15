import { IconButton } from "@/components/button-icon";
import { CustomAlert } from "@/components/custom-alert";
import { CustomCardContent } from "@/components/custom-card-content";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getDesignAvatars, getDesigns } from "@/lib/data/dl";
import { ReactNode } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { MdDesignServices } from "react-icons/md";
import { AddDesign } from "./add-design";

const AddDesignPage = async () => {
  const user = await currentUser();

  const designAvatars = await getDesignAvatars();
  const designs = await getDesigns();

  const header: ReactNode = (
    <CardHeader className="border-b border-b-secondary">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Add Design</h1>
        <IconButton
          icon={<IoArrowBackCircleSharp size={25} />}
          href={"/design"}
          label={"Back to designs"}
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
              form={
                <AddDesign designAvatars={designAvatars} designs={designs} />
              }
              label={"Design"}
              icon={<MdDesignServices size={320} />}
              formWidth={750}
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

export default AddDesignPage;
