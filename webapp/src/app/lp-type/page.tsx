import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getLandingPageTypes, getTopics } from "@/lib/data/dl";
import { IoAddCircleSharp } from "react-icons/io5";
import { columns } from "./columns";

const LandingPageTypePage = async () => {
  const user = await currentUser();

  const lpTypes = await getLandingPageTypes();

  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Landing page type</h1>

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <IconButton
                icon={<IoAddCircleSharp size={25} />}
                href={"/lp-type/add"}
                label={"Add landing page type"}
              />
            )}
          </div>
        </CardHeader>
      </Card>
      <DataTable
        columns={columns}
        data={lpTypes!}
        columnVisibilityObj={{
          slug: false,
          description: false,
        }}
      />
    </div>
  );
};

export default LandingPageTypePage;
