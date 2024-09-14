import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { Card, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getLicenses } from "@/lib/data/dl";
import { IoAddCircleSharp } from "react-icons/io5";
import { columns } from "./columns";

const LicensePage = async () => {
  const user = await currentUser();

  const licenses = await getLicenses();

  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Licenses</h1>

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <IconButton
                icon={<IoAddCircleSharp size={25} />}
                href={"/license/add"}
                label={"Add license"}
              />
            )}
          </div>
        </CardHeader>
      </Card>
      <DataTable
        columns={columns}
        data={licenses!}
        columnVisibilityObj={{
          slug: false,
          description: false,
        }}
      />
    </div>
  );
};

export default LicensePage;
