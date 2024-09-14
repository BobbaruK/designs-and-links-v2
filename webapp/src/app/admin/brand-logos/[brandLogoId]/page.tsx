import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getBrandLogoById } from "@/lib/data/dl";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AdminBrandLogosEdit } from "./admin-brand-logo-edit";

interface Props {
  params: {
    brandLogoId: string;
  };
}

const AdminBrandLogoPage = async ({ params: { brandLogoId } }: Props) => {
  const brandLogo = await getBrandLogoById(brandLogoId);

  return (
    <div className="container flex flex-col gap-6">
      {!brandLogo ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">
                  Brand logo: {brandLogoId}
                </h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/admin/brand-logos"}
                  label={"Back to brand logos"}
                />
              </div>
            </CardHeader>
          </Card>
          <CustomAlert
            title={"Error!"}
            description={`Seems like the user flag that you are looking for does not exist.`}
            variant="destructive"
          />
        </>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-4xl font-bold">
                Brand logo {brandLogo.name}
              </h1>
              <div className="ms-auto flex items-center justify-center gap-4">
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/admin/brand-logos"}
                  label={"Back to brand logos"}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <AdminBrandLogosEdit brandLogo={brandLogo} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminBrandLogoPage;
