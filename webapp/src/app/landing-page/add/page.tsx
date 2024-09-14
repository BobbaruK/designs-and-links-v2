import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import {
  getBrands,
  getDesigns,
  getFormValidations,
  getLandingPageTypes,
  getLanguages,
  getLicenses,
  getSubDesigns,
  getTopics,
} from "@/lib/data/dl";
import { getUsers } from "@/lib/data/user";
import { ReactNode } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AddLandingPage } from "./add-landing-page";

const AddLandingPagePage = async () => {
  const user = await currentUser();

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
    <CardHeader>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Add Landing Page</h1>
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
      {user?.role === "EDITOR" || user?.role === "ADMIN" ? (
        <>
          <Card>
            {header}
            <CardContent>
              <AddLandingPage
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
          </Card>
        </>
      ) : (
        <>
          <Card>{header}</Card>
          <CustomAlert
            title={"Heads up!"}
            description={"You do not have permission to access this content"}
            variant="destructive"
          />
        </>
      )}
    </div>
  );
};

export default AddLandingPagePage;
