import { IconButton } from "@/components/icon-button";
import { currentUser } from "@/lib/auth";
import { getFormValidationBySlug } from "@/lib/data/dl";
import { CiEdit } from "react-icons/ci";
import { IoArrowBackCircleSharp } from "react-icons/io5";

interface Props {
  params: {
    slug: string;
  };
}

const FormValidationPage = async ({ params: { slug } }: Props) => {
  const formValidation = await getFormValidationBySlug(slug);
  const user = await currentUser();

  if (!formValidation) return null;

  return (
    <div className="container">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">
          Form validation: {formValidation.name}
        </h1>
        <div className="ms-auto flex items-center justify-center gap-4">
          {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
            <IconButton
              icon={<CiEdit size={25} />}
              href={`/form-validation/${formValidation.slug}/edit`}
              label={"Edit form validation"}
            />
          )}
          <IconButton
            icon={<IoArrowBackCircleSharp size={25} />}
            href={"/form-validation"}
            label={"Back to form validations"}
          />
        </div>
      </div>
      <p>{formValidation.description}</p>
      <pre>{JSON.stringify(formValidation, undefined, 2)}</pre>
    </div>
  );
};

export default FormValidationPage;
