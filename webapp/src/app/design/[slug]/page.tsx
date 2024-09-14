import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/landing-page-columns";
import { Card, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getDesignBySlug, getSubDesignBySlug } from "@/lib/data/dl";
import db from "@/lib/db";
import { CiEdit } from "react-icons/ci";
import { IoArrowBackCircleSharp } from "react-icons/io5";

interface Props {
  params: {
    slug: string;
  };
}

const DesignPage = async ({ params: { slug } }: Props) => {
  const design = await getDesignBySlug(slug);
  const subDesign = await getSubDesignBySlug(slug);

  console.log("design", design);
  console.log("subDesign", subDesign);

  const user = await currentUser();

  const name = design ? design.name : subDesign?.name;
  const dSlug = design ? design.slug : subDesign?.slug;

  const subDesignLandingPages = await db.dL_LandingPage.findMany({
    where: {
      subDesignId: subDesign?.id,
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

  const designLandingPages = await db.dL_LandingPage.findMany({
    where: {
      designId: design?.id,
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
      {!design && !subDesign ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">Design: {slug}</h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/design"}
                  label={"Back to designs"}
                />
              </div>
            </CardHeader>
          </Card>
          <CustomAlert
            title={"Error!"}
            description={`Seems like the design that you are looking for does not exist.`}
            variant="destructive"
          />
        </>
      ) : (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">Design: {name}</h1>
                <div className="ms-auto flex items-center justify-center gap-4">
                  {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
                    <IconButton
                      icon={<CiEdit size={25} />}
                      href={`/design/${dSlug}/edit`}
                      label={"Edit design"}
                    />
                  )}
                  <IconButton
                    icon={<IoArrowBackCircleSharp size={25} />}
                    href={"/design"}
                    label={"Back to designs"}
                  />
                </div>
              </div>
            </CardHeader>
            {/* <CardContent>
          </CardContent> */}
          </Card>
          <DataTable
            columns={columns}
            data={design ? designLandingPages : subDesignLandingPages}
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

export default DesignPage;
