import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/landing-page-columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getLanguageByIso } from "@/lib/data/dl";
import db from "@/lib/db";
import { CiEdit } from "react-icons/ci";
import { IoArrowBackCircleSharp } from "react-icons/io5";

interface Props {
  params: {
    iso6391: string;
  };
}

const LanguagePage = async ({ params: { iso6391 } }: Props) => {
  const language = await getLanguageByIso(iso6391);
  const user = await currentUser();

  const landingPages = await db.dL_LandingPage.findMany({
    where: {
      languageId: language?.id,
    },
    include: {
      createdBy: {
        omit: {
          password: true,
        },
      },
      updatedBy: {
        omit: {
          password: true,
        },
      },
      brand: true,
      design: true,
      formValidation: true,
      language: true,
      license: true,
      lpType: true,
      requester: {
        omit: {
          password: true,
        },
      },
      subDesign: true,
      topic: true,
    },
  });

  return (
    <div className="container flex flex-col gap-6">
      {!language ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">Language: {iso6391}</h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/language"}
                  label={"Back to languages"}
                />
              </div>
            </CardHeader>
          </Card>
          <CustomAlert
            title={"Error!"}
            description={`Seems like the topic that you are looking for does not exist.`}
            variant="destructive"
          />
        </>
      ) : (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">
                  Language: {language.englishName}
                </h1>
                <div className="ms-auto flex items-center justify-center gap-4">
                  {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
                    <IconButton
                      icon={<CiEdit size={25} />}
                      href={`/language/${language.iso_639_1}/edit`}
                      label={"Edit language"}
                    />
                  )}
                  <IconButton
                    icon={<IoArrowBackCircleSharp size={25} />}
                    href={"/language"}
                    label={"Back to languages"}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                {language.name} / {language.iso_639_1}
                {language.iso_3166_1 ? `-${language.iso_3166_1}` : ""}
              </p>
            </CardContent>
          </Card>
          <DataTable
            columns={columns}
            data={landingPages!}
            columnVisibilityObj={{
              slug: false,
              fxoroFooter: false,
              requester: false,
              createdAt: false,
              createdBy: false,
              updatedAt: false,
              updatedBy: false,
            }}
          />
        </>
      )}
    </div>
  );
};

export default LanguagePage;
