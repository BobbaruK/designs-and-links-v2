import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getFlags } from "@/lib/data/dl/flags";
import { ReactNode } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AddLanguage } from "./add-language";

const AddLanguagePage = async () => {
  const user = await currentUser();

  const flags = await getFlags();

  const header: ReactNode = (
    <CardHeader>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Add Language</h1>
        <IconButton
          icon={<IoArrowBackCircleSharp size={25} />}
          href={"/language"}
          label={"Back to languages"}
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
              <AddLanguage flags={flags} />
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

export default AddLanguagePage;
