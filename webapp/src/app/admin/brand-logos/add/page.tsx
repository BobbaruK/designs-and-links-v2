import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AdminBrandLogoAdd } from "./admin-brand-logo-add";

const AdminAddBrandLogo = () => {
  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Add brand logo</h1>
            <IconButton
              icon={<IoArrowBackCircleSharp size={25} />}
              href={"/admin/brand-logos"}
              label={"Back to brand logos"}
            />
          </div>
        </CardHeader>
        <CardContent>
          <AdminBrandLogoAdd />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAddBrandLogo;
