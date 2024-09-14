import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { CustomAvatar } from "@/components/custom-avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getFlags, getLanguageByIso } from "@/lib/data/dl";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { EditLanguage } from "./edit-language";
import { HiMiniLanguage } from "react-icons/hi2";
import Image from "next/image";
import { CustomCardContent } from "@/components/custom-card-content";
import { ReactNode } from "react";

interface Props {
  params: {
    iso6391: string;
  };
}

const EditLanguagePage = async ({ params: { iso6391 } }: Props) => {
  const user = await currentUser();

  const language = await getLanguageByIso(iso6391);
  const flags = await getFlags();

  const header: ReactNode = (
    <CardHeader className="border-b border-b-secondary">
      <div className="flex items-center justify-between gap-4">
        <h1 className="flex items-center justify-start gap-4 text-4xl font-bold">
          {!language ? (
            `Language: ${iso6391}`
          ) : (
            <>
              <CustomAvatar image={language.flag} />
              {language.englishName}
            </>
          )}
        </h1>
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
      {!language ? (
        <>
          <Card>{header}</Card>
          <CustomAlert
            title={"Error!"}
            asset="language"
            variant="destructive"
          />
        </>
      ) : (
        <>
          <Card>
            {header}

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <>
                <CustomCardContent
                  form={<EditLanguage language={language} flags={flags} />}
                  flag={language.flag}
                  flagImgAlt={language.englishName}
                  flagFallBack={language.englishName}
                  icon={<HiMiniLanguage size={520} />}
                />
              </>
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

export default EditLanguagePage;
