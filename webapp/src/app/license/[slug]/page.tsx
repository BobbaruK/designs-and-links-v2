import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/landing-page-columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getLicenseBySlug } from "@/lib/data/dl";
import db from "@/lib/db";
import { CiEdit } from "react-icons/ci";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { ReactNode } from "react";

interface Props {
  params: {
    slug: string;
  };
}

const LicensePage = async ({ params: { slug } }: Props) => {
  const license = await getLicenseBySlug(slug);
  const user = await currentUser();

  const header: ReactNode = (
    <CardHeader>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">
          {!license ? `License: ${slug}` : license.name}
        </h1>
        <div className="flex gap-4">
          {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
            <IconButton
              icon={<CiEdit size={25} />}
              href={`/license/${license?.slug}/edit`}
              label={"Edit license"}
            />
          )}
          <IconButton
            icon={<IoArrowBackCircleSharp size={25} />}
            href={"/license"}
            label={"Back to licenses"}
          />
        </div>
      </div>
    </CardHeader>
  );

  return (
    <div className="container flex flex-col gap-6">
      {!license ? (
        <>
          <Card>{header}</Card>
          <CustomAlert title={"Error!"} asset="license" variant="destructive" />
        </>
      ) : (
        <>
          <Card>
            {header}
            <CardContent>
              <p>
                {license.description || (
                  <span className="italic">There is no description added</span>
                )}
              </p>
              {/* <pre>{JSON.stringify(formValidation, undefined, 2)}</pre> */}
            </CardContent>
          </Card>
          <DataTable
            columns={columns}
            data={license.LandingPages!}
            columnVisibilityObj={{
              slug: false,
              fxoroFooter: false,
              license: false,
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

export default LicensePage;
