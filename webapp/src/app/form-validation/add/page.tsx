import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/icon-button";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import Link from "next/link";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";
import { AddFormValidation } from "./add-form-validation";

const AddFormValidationPage = async () => {
  const user = await currentUser();

  return (
    <div className="container flex flex-col gap-6">
      {user?.role === "EDITOR" || user?.role === "ADMIN" ? (
        <>
          <AddFormValidation
            title={
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">Add Form Validation</h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/form-validation"}
                  label={"Back to form validations"}
                />
              </div>
            }
          />
        </>
      ) : (
        <>
          <CustomAlert
            title={"Heads up!"}
            description={"You do not have permission to access this content"}
            variant="destructive"
          />
          <div>
            <Button asChild size={"lg"}>
              <Link
                href={"/form-validation"}
                className="flex items-center gap-2"
              >
                <RiArrowGoBackFill size={20} /> Go back to form validations
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddFormValidationPage;
