import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/landing-page-columns";
import { Card, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getBrandBySlug } from "@/lib/data/dl";
import db from "@/lib/db";
import { CiEdit } from "react-icons/ci";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { ReactNode } from "react";

interface Props {
  params: {
    slug: string;
  };
}

const BrandPage = async ({ params: { slug } }: Props) => {
  const brand = await getBrandBySlug(slug);
  const user = await currentUser();

  const header: ReactNode = (
    <CardHeader>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">
          {!brand ? `Brand: ${slug}` : brand.name}
        </h1>
        <div className="flex gap-4">
          {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
            <IconButton
              icon={<CiEdit size={25} />}
              href={`/brand/${brand?.slug}/edit`}
              label={"Edit brand"}
            />
          )}
          <IconButton
            icon={<IoArrowBackCircleSharp size={25} />}
            href={"/brand"}
            label={"Back to brands"}
          />
        </div>
      </div>
    </CardHeader>
  );

  return (
    <div className="container flex flex-col gap-6">
      {!brand ? (
        <>
          <Card>{header}</Card>
          <CustomAlert title={"Error!"} asset="brand" variant="destructive" />
        </>
      ) : (
        <>
          <Card>{header}</Card>
          <DataTable
            columns={columns}
            data={brand.LandingPages}
            columnVisibilityObj={{
              slug: false,
              fxoroFooter: false,
              requester: false,
              brand: false,
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

export default BrandPage;
