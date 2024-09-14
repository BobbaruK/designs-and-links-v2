import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { FaWpforms } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AddFormValidation } from "./add-form-validation";
import { CustomCardContent } from "@/components/custom-card-content";

const AddFormValidationPage = async () => {
  const user = await currentUser();

  const header = (
    <CardHeader className="border-b border-b-secondary">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Add Form Validation</h1>
        <IconButton
          icon={<IoArrowBackCircleSharp size={25} />}
          href={"/form-validation"}
          label={"Back to form validations"}
        />
      </div>
    </CardHeader>
  );

  return (
    <div className="container flex flex-col gap-6">
      {user?.role === "EDITOR" || user?.role === "ADMIN" ? (
        <Card>
          {header}
          <CustomCardContent
            form={<AddFormValidation />}
            label={"Form Validation"}
            icon={<FaWpforms size={320} />}
          />
        </Card>
      ) : (
        <>
          <Card>{header}</Card>
          <CustomAlert
            title={"Heads up!"}
            description={"You do not have permission to access this content"}
            variant="destructive"
          />
        </>
      )}
    </div>
  );
};

export default AddFormValidationPage;
