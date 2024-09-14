import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getFlagById } from "@/lib/data/dl/flags";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AdminFlagEdit } from "./admin-flag-edit";

interface Props {
  params: {
    flagId: string;
  };
}

const AdminFlag = async ({ params: { flagId } }: Props) => {
  const flag = await getFlagById(flagId);

  return (
    <div className="container flex flex-col gap-6">
      {!flag ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">Flag: {flagId}</h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/admin/flags"}
                  label={"Back to flags"}
                />
              </div>
            </CardHeader>{" "}
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
              <h1 className="text-4xl font-bold">Flag {flag.name}</h1>
              <div className="ms-auto flex items-center justify-center gap-4">
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/admin/flags"}
                  label={"Back to flags"}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <AdminFlagEdit flag={flag} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminFlag;
