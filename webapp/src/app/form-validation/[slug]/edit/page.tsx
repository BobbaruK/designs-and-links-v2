import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getFormValidationBySlug } from "@/lib/data/dl";
import { FaWpforms } from "react-icons/fa6";
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
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">Form validation: {slug}</h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/form-validation"}
                  label={"Back to user avatars"}
                />
              </div>
            </CardHeader>
          </Card>
          <CustomAlert
            title={"Error!"}
            asset="form validation"
            variant="destructive"
          />
        </>
      ) : (
        <>
          <Card>
            <CardHeader className="border-b border-b-secondary">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">{formValidation?.name}</h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={`/form-validation/${slug}`}
                  label={`Back to ${formValidation?.name}`}
                />
              </div>
            </CardHeader>

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              // TODO: custom component for CardContent
              <CardContent className="flex items-stretch p-0">
                <div className="w-full max-w-[450px] border-e border-e-secondary p-6">
                  <EditFormValidation formValidation={formValidation} />
                </div>
                <div className="relative grid grow place-items-center overflow-hidden p-6">
                  <div className="absolute right-4 z-10 line-clamp-1 max-w-full text-[100px] font-black text-primary opacity-20">
                    {formValidation.name}
                  </div>
                  <div className="pointer-events-none relative z-0">
                    <FaWpforms size={320} />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {user?.role !== "EDITOR" && user?.role !== "ADMIN" && (
            <CustomAlert
              title={"Heads up!"}
              description={"You do not have permission to access this content"}
              variant="destructive"
            />
          )}
        </>
      )}
    </div>
  );
};

export default EditFormValidationPage;
