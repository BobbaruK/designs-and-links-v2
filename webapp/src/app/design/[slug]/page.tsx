import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/landing-page-columns";
import { Card, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getDesignBySlug, getSubDesignBySlug } from "@/lib/data/dl";
import db from "@/lib/db";
import { CiEdit } from "react-icons/ci";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { ReactNode } from "react";

interface Props {
  params: {
    slug: string;
  };
}

const DesignPage = async ({ params: { slug } }: Props) => {
  const design = await getDesignBySlug(slug);
  const subDesign = await getSubDesignBySlug(slug);

  // console.log("design", design);
  // console.log("subDesign", subDesign);

  const user = await currentUser();

  const name = design ? design.name : subDesign?.name;
  const dSlug = design ? design.slug : subDesign?.slug;

  const header: ReactNode = (
    <CardHeader>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">{name || `Design: ${slug}`}</h1>
        <div className="flex gap-4">
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
  );

  return (
    <div className="container flex flex-col gap-6">
      {!design && !subDesign ? (
        <>
          <Card>{header}</Card>
          <CustomAlert title={"Error!"} asset="design" variant="destructive" />
        </>
      ) : (
        <>
          <Card>{header}</Card>
          <DataTable
            columns={columns}
            // data={design ? designLandingPages : subDesignLandingPages}
            data={design ? design.LandingPages : subDesign?.LandingPages!}
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
