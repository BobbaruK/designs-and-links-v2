import { IconButton } from "@/components/button-icon";
import { CustomAlert } from "@/components/custom-alert";
import { CustomCardContent } from "@/components/custom-card-content";
import { Card, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import {
  getDesignAvatars,
  getDesignBySlug,
  getDesigns,
  getSubDesignBySlug,
} from "@/lib/data/dl";
import { ReactNode } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { MdDesignServices } from "react-icons/md";
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

  const name = design ? design.name : subDesign?.name;

  const header: ReactNode = (
    <CardHeader className="border-b border-b-secondary">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">{name || `Brand: ${slug}`}</h1>
        <IconButton
          icon={<IoArrowBackCircleSharp size={25} />}
          href={"/design"}
          label={"Back to brands"}
        />
      </div>
    </CardHeader>
  );

  return (
    <div className="container flex flex-col gap-6">
      {!design && !subDesign ? (
        <>
          <Card>{header}</Card>
          <CustomAlert title={"Error!"} asset="design" variant="destructive" />
        </>
      ) : (
        <>
          <Card>
            {header}

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <CustomCardContent
                form={
                  <EditDesign
                    design={design!}
                    subDesign={subDesign!}
                    designAvatars={designAvatars}
                    designs={designs}
                  />
                }
                label={name}
                icon={<MdDesignServices size={320} />}
                formWidth={750}
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

export default EditDesignPage;
