import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getDesignAvatars, getDesigns } from "@/lib/data/dl";
import { ReactNode } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AddDesign } from "./add-design";

const AddDesignPage = async () => {
  const user = await currentUser();

  const designAvatars = await getDesignAvatars();
  const designs = await getDesigns();

  const header: ReactNode = (
    <CardHeader>
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
            <CardContent>
              <AddDesign designAvatars={designAvatars} designs={designs} />
            </CardContent>
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
