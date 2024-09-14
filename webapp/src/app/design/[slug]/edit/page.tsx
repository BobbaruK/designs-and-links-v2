import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import {
  getBrandLogos,
  getDesignAvatars,
  getDesignBySlug,
  getDesigns,
  getSubDesignBySlug,
} from "@/lib/data/dl";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { EditDesign } from "./edit-design";

interface Props {
  params: {
    slug: string;
  };
}

const EditDesignPage = async ({ params: { slug } }: Props) => {
  const user = await currentUser();

  const design = await getDesignBySlug(slug);
  const subDesign = await getSubDesignBySlug(slug);

  const designAvatars = await getDesignAvatars();
  const designs = await getDesigns();

  return (
    <div className="container flex flex-col gap-6">
      {!design && !subDesign ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">Design: {slug}</h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/design"}
                  label={"Back to designs"}
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
                  Edit design: {design?.name}
                </h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={`/design/${slug}`}
                  label={`Back to design ${"cutare"}`}
                />
              </div>
            </CardHeader>

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <CardContent>
                <EditDesign
                  design={design!}
                  subDesign={subDesign!}
                  designAvatars={designAvatars}
                  designs={designs}
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

export default EditDesignPage;
