import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { currentUser } from "@/lib/auth";
import { getFormValidationBySlug } from "@/lib/data/dl";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { EditFormValidation } from "./edit-form-validation";

interface Props {
  params: {
    slug: string;
  };
}

const EditFormValidationPage = async ({ params: { slug } }: Props) => {
  const user = await currentUser();

  const formValidation = await getFormValidationBySlug(slug);

  return (
    <div className="container flex flex-col gap-6">
      {!formValidation ? (
        <>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Edit form validation: {slug}</h1>
            <IconButton
              icon={<IoArrowBackCircleSharp size={25} />}
              href={"/form-validation"}
              label={"Back to form validations"}
            />
          </div>
          <CustomAlert
            title={"Error!"}
            description={`Seems like the form validation that you are looking for does not exist.`}
            variant="destructive"
          />
        </>
      ) : (
        <>
          {user?.role === "EDITOR" || user?.role === "ADMIN" ? (
            <EditFormValidation
              formValidation={formValidation!}
              title={
                <div className="flex items-center justify-between gap-4">
                  <h1 className="text-4xl font-bold">
                    Edit form validation: {formValidation?.name}
                  </h1>
                  <IconButton
                    icon={<IoArrowBackCircleSharp size={25} />}
                    href={`/form-validation/${slug}`}
                    label={`Back to form validation ${"cutare"}`}
                  />
                </div>
              }
            />
          ) : (
            <>
              <div className="container flex flex-col gap-6">
                <div className="flex items-center justify-between gap-4">
                  <h1 className="text-4xl font-bold">
                    Edit form validation: {formValidation?.name}
                  </h1>
                  <IconButton
                    icon={<IoArrowBackCircleSharp size={25} />}
                    href={`/form-validation/${slug}`}
                    label={"Back to form validations"}
                  />
                </div>
                <CustomAlert
                  title={"Heads up!"}
                  description={
                    "You do not have permission to access this content"
                  }
                  variant="destructive"
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EditFormValidationPage;
