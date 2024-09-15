import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AddBrand } from "./add-brand";
import { ReactNode } from "react";
import { getBrandLogos } from "@/lib/data/dl";
import { CustomCardContent } from "@/components/custom-card-content";
import { TbBrandAirtable } from "react-icons/tb";

const AddBrandPage = async () => {
  const user = await currentUser();

  const brandLogos = await getBrandLogos();

  const header: ReactNode = (
    <CardHeader className="border-b border-b-secondary">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Add Brand</h1>
        <IconButton
          icon={<IoArrowBackCircleSharp size={25} />}
          href={"/brand"}
          label={"Back to brand"}
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
            <CustomCardContent
              form={<AddBrand logos={brandLogos} />}
              label={"Brand"}
              icon={<TbBrandAirtable size={320} />}
              formWidth={700}
            />
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

export default AddBrandPage;
