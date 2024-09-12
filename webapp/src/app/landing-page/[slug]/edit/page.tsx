import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import {
  getBrands,
  getDesigns,
  getFormValidations,
  getLandingPageBySlug,
  getLandingPageTypes,
  getLanguages,
  getLicenses,
  getSubDesigns,
  getTopics,
} from "@/lib/data/dl";
import { getUsers } from "@/lib/data/user";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { EditLandingPage } from "./edit-landing-page";

interface Props {
  params: {
    slug: string;
  };
}

const EditLandingPagePage = async ({ params: { slug } }: Props) => {
  const user = await currentUser();

  const landingPage = await getLandingPageBySlug(slug);
  const users = await getUsers();
  const topics = await getTopics();
  const designs = await getDesigns();
  const subDesigns = await getSubDesigns();
  const formValidation = await getFormValidations();
  const licenses = await getLicenses();
  const lpTypes = await getLandingPageTypes();
  const languages = await getLanguages();
  const brands = await getBrands();

  return (
    <div className="container flex flex-col gap-6">
      {!landingPage ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">Landing page: {slug}</h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/landing-page"}
                  label={"Back to landing pages"}
                />
              </div>
            </CardHeader>
          </Card>
          <CustomAlert
            title={"Error!"}
            description={`Seems like the design that you are looking for does not exist.`}
            variant="destructive"
          />
        </>
      ) : (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">
                  Edit landing page: {landingPage.name}
                </h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={`/landing-page/${slug}`}
                  label={`Back to design ${landingPage.name}`}
                />
              </div>
            </CardHeader>

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <CardContent>
                <EditLandingPage
                  landingPage={landingPage}
                  users={users}
                  topics={topics}
                  designs={designs}
                  subDesigns={subDesigns}
                  formValidations={formValidation}
                  licenses={licenses}
                  lpTypes={lpTypes}
                  languages={languages}
                  brands={brands}
                />
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

export default EditLandingPagePage;
