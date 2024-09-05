import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/icon-button";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { getFormValidationBySlug } from "@/lib/data/dl";
import Link from "next/link";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";
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
          <CustomAlert
            title={"Heads up!"}
            description={"You do not have permission to access this content"}
            variant="destructive"
          />
          <div>
            <Button asChild size={"lg"}>
              <Link
                href={`/form-validation/${slug}`}
                className="flex items-center gap-2"
              >
                <RiArrowGoBackFill size={20} /> Go back to{" "}
                {formValidation?.name}
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditFormValidationPage;
