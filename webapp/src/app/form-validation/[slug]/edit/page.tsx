import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/icon-button";
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

      {user?.role === "EDITOR" || user?.role === "ADMIN" ? (
        <EditFormValidation formValidation={formValidation!} />
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

export default EditFormValidationPage;
