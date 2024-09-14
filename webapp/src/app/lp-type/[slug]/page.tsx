import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/landing-page-columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getLandingPageTypeBySlug } from "@/lib/data/dl";
import db from "@/lib/db";
import { CiEdit } from "react-icons/ci";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { ReactNode } from "react";

interface Props {
  params: {
    slug: string;
  };
}

const LandingPageTypePage = async ({ params: { slug } }: Props) => {
  const lpType = await getLandingPageTypeBySlug(slug);
  const user = await currentUser();

  const header: ReactNode = (
    <CardHeader>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">
          {!lpType ? `Landing page type: ${slug}` : lpType.name}
        </h1>
        <div className="flex gap-4">
          {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
            <IconButton
              icon={<CiEdit size={25} />}
              href={`/lp-type/${lpType?.slug}/edit`}
              label={"Edit landing page type"}
            />
          )}
          <IconButton
            icon={<IoArrowBackCircleSharp size={25} />}
            href={"/lp-type"}
            label={"Back to landing page types"}
          />
        </div>
      </div>
    </CardHeader>
  );

  return (
    <div className="container flex flex-col gap-6">
      {!lpType ? (
        <>
          <Card>{header}</Card>
          <CustomAlert
            title={"Error!"}
            asset="landing page type"
            variant="destructive"
          />
        </>
      ) : (
        <>
          <Card>
            {header}
            <CardContent>
              <p>
                {lpType.description || (
                  <span className="italic">There is no description added</span>
                )}
              </p>
              {/* <pre>{JSON.stringify(formValidation, undefined, 2)}</pre> */}
            </CardContent>
          </Card>
          <DataTable
            columns={columns}
            data={lpType.LandingPages!}
            columnVisibilityObj={{
              slug: false,
              fxoroFooter: false,
              requester: false,
              lpType: false,
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

export default LandingPageTypePage;
