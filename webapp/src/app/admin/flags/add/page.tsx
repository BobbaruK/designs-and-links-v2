import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AdminFlagAdd } from "./admin-flag-add";

const AdminAddFlag = () => {
  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Add flag</h1>
            <IconButton
              icon={<IoArrowBackCircleSharp size={25} />}
              href={"/admin/flags"}
              label={"Back to flags"}
            />
          </div>
        </CardHeader>
        <CardContent>
          <AdminFlagAdd />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAddFlag;
