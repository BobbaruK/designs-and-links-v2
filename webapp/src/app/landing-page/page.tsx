import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/landing-page-columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getLandingPages } from "@/lib/data/dl";
import { IoAddCircleSharp } from "react-icons/io5";

const LandingPagePage = async () => {
  const user = await currentUser();

  const landingPages = await getLandingPages();

  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Landing pages</h1>

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <IconButton
                icon={<IoAddCircleSharp size={25} />}
                href={"/landing-page/add"}
                label={"Add landing page"}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0"></CardContent>
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
    </div>
  );
};

export default LandingPagePage;
