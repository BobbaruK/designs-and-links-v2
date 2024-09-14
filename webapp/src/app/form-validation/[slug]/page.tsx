import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/landing-page-columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getFormValidationBySlug } from "@/lib/data/dl";
import db from "@/lib/db";
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

  const landingPages = await db.dL_LandingPage.findMany({
    where: {
      formValidationId: formValidation?.id,
    },
    include: {
      createdBy: {
        omit: {
          password: true,
        },
      },
      updatedBy: {
        omit: {
          password: true,
        },
      },
      brand: true,
      design: true,
      formValidation: true,
      language: true,
      license: true,
      lpType: true,
      requester: {
        omit: {
          password: true,
        },
      },
      subDesign: true,
      topic: true,
    },
  });

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
                  label={"Back to form validations"}
                />
              </div>
            </CardHeader>
          </Card>
          <CustomAlert
            title={"Error!"}
            description={`Seems like the form validation that you are looking for does not exist.`}
            variant="destructive"
          />
        </>
      ) : (
        <>
          <Card>
            <CardHeader>
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
            </CardHeader>
            <CardContent>
              <p>
                {formValidation.description || (
                  <span className="italic">There is no description added</span>
                )}
              </p>
              {/* <pre>{JSON.stringify(formValidation, undefined, 2)}</pre> */}
            </CardContent>
          </Card>
          <DataTable
            columns={columns}
            data={landingPages!}
            columnVisibilityObj={{
              slug: false,
              fxoroFooter: false,
              requester: false,
              createdAt: false,
              createdBy: false,
              updatedAt: false,
              updatedBy: false,
            }}
          />
        </>
      )}
    </div>
  );
};

export default FormValidationPage;
