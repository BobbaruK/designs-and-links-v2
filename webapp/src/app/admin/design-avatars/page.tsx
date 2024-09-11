import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getDesignAvatars } from "@/lib/data/dl";
import { IoAddCircleSharp, IoArrowBackCircleSharp } from "react-icons/io5";
import { columns } from "./columns";

const AdminDesignAvatarPage = async () => {
  const brandLogos = await getDesignAvatars();

  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Design avatars</h1>
            <div className="flex gap-4">
              <IconButton
                icon={<IoAddCircleSharp size={25} />}
                href={"/admin/design-avatars/add"}
                label={"Add brand logo"}
              />
              <IconButton
                icon={<IoArrowBackCircleSharp size={25} />}
                href={"/admin"}
                label={"Back to admin area"}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0"></CardContent>
      </Card>
      <DataTable
        columns={columns}
        data={brandLogos!}
        columnVisibilityObj={{}}
      />
    </div>
  );
};

export default AdminDesignAvatarPage;
