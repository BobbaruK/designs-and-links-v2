import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getFlags } from "@/lib/data/dl/flags";
import { ReactNode } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AddLanguage } from "./add-language";
import { HiMiniLanguage } from "react-icons/hi2";

const AddLanguagePage = async () => {
  const user = await currentUser();

  const flags = await getFlags();

  const header: ReactNode = (
    <CardHeader className="border-b border-b-secondary">
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
            <CardContent className="flex items-stretch p-0">
              <div className="w-full max-w-[450px] border-e border-e-secondary p-6">
                <AddLanguage flags={flags} />
              </div>

              <div className="relative grid grow place-items-center overflow-hidden p-6">
                <div className="absolute right-4 z-10 line-clamp-1 max-w-full text-[100px] font-black text-primary opacity-20">
                  Language
                </div>
                <div className="pointer-events-none relative z-0">
                  <HiMiniLanguage size={520} />
                </div>
              </div>
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
