import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/icon-button";
import { currentUser } from "@/lib/auth";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AddFormValidation } from "./add-form-validation";

const AddFormValidationPage = async () => {
  const user = await currentUser();

  return (
    <div className="container flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Add Form Validation</h1>
        <IconButton
          icon={<IoArrowBackCircleSharp size={25} />}
          href={"/form-validation"}
          label={"Back to form validations"}
        />
      </div>

      {user?.role === "EDITOR" || user?.role === "ADMIN" ? (
        <>
          <AddFormValidation />
        </>
      ) : (
        <CustomAlert
          title={"Heads up!"}
          description={"You do not have permission to access this content"}
          variant="destructive"
        />
      )}
    </div>
  );
};

export default AddFormValidationPage;
