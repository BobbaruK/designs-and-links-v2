import { IconButton } from "@/components/button-icon";
import { CustomAlert } from "@/components/custom-alert";
import { CustomCardContent } from "@/components/custom-card-content";
import { Card, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getBrandBySlug, getBrandLogos } from "@/lib/data/dl";
import { ReactNode } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { TbBrandAirtable } from "react-icons/tb";
import { EditBrand } from "./edit-brand";

interface Props {
  params: {
    slug: string;
  };
}

const EditBrandPage = async ({ params: { slug } }: Props) => {
  const user = await currentUser();
  const brand = await getBrandBySlug(slug);
  const logos = await getBrandLogos();

  const header: ReactNode = (
    <CardHeader className="border-b border-b-secondary">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">
          {!brand ? `Brand: ${slug}` : brand.name}
        </h1>
        <IconButton
          icon={<IoArrowBackCircleSharp size={25} />}
          href={"/brand"}
          label={"Back to brands"}
        />
      </div>
    </CardHeader>
  );

  return (
    <div className="container flex flex-col gap-6">
      {!brand ? (
        <>
          <Card>{header}</Card>
          <CustomAlert title={"Error!"} asset="brand" variant="destructive" />
        </>
      ) : (
        <>
          <Card>
            {header}

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <CustomCardContent
                form={<EditBrand brand={brand} logos={logos} />}
                label={brand?.name}
                icon={<TbBrandAirtable size={320} />}
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

export default EditBrandPage;
