import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AddTopic } from "./add-topic";
import { ReactNode } from "react";

const AddTopicPage = async () => {
  const user = await currentUser();

  const header: ReactNode = (
    <CardHeader>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Add Topic</h1>
        <IconButton
          icon={<IoArrowBackCircleSharp size={25} />}
          href={"/topic"}
          label={"Back to topics"}
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
              <AddTopic />
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

export default AddTopicPage;
