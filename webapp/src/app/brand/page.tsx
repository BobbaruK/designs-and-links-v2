import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getBrands } from "@/lib/data/dl";
import { IoAddCircleSharp } from "react-icons/io5";
import { columns } from "./columns";

const BrandsPage = async () => {
  const user = await currentUser();

  const brands = await getBrands();

  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Brands</h1>

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <IconButton
                icon={<IoAddCircleSharp size={25} />}
                href={"/brand/add"}
                label={"Add brand"}
              />
            )}
          </div>
        </CardHeader>
      </Card>
      <DataTable
        columns={columns}
        data={brands!}
        columnVisibilityObj={{
          slug: false,
          description: false,
        }}
      />
    </div>
  );
};

export default BrandsPage;
