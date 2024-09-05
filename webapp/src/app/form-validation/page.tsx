import { DataTable } from "@/components/data-table";
import { IconButton } from "@/components/icon-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getAllFormValidation } from "@/lib/data/dl";
import { IoAddCircleSharp } from "react-icons/io5";
import { columns } from "./columns";

const FormValidationsPage = async () => {
  const user = await currentUser();

  const formValidations = await getAllFormValidation();

  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Form Validations</h1>

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <IconButton
                icon={<IoAddCircleSharp size={25} />}
                href={"/form-validation/add"}
                label={"Add form validation"}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0"></CardContent>
      </Card>
      <DataTable columns={columns} data={formValidations!} />
    </div>
  );
};

export default FormValidationsPage;
