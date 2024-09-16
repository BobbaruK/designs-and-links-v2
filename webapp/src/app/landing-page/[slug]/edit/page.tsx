import { IconButton } from "@/components/button-icon";
import { CustomAlert } from "@/components/custom-alert";
import { CustomCardContent } from "@/components/custom-card-content";
import { Card, CardHeader } from "@/components/ui/card";
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
import { ReactNode } from "react";
import { ImPagebreak } from "react-icons/im";
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

  const header: ReactNode = (
    <CardHeader className="border-b border-b-secondary">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">
          {!landingPage ? `Landing page: ${slug}` : landingPage.name}
        </h1>
        <IconButton
          icon={<IoArrowBackCircleSharp size={25} />}
          href={"/landing-page"}
          label={"Back to landing pages"}
        />
      </div>
    </CardHeader>
  );

  return (
    <div className="container flex flex-col gap-6">
      {!landingPage ? (
        <>
          <Card>{header}</Card>
          <CustomAlert
            title={"Error!"}
            asset="landing page"
            variant="destructive"
          />
        </>
      ) : (
        <>
          <Card>
            {header}

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <CustomCardContent
                form={
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
                }
                label={landingPage?.name}
                icon={<ImPagebreak size={320} />}
                formWidth={700}
              />
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
