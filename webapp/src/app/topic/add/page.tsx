import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { CustomCardContent } from "@/components/custom-card-content";
import { Card, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { ReactNode } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { MdOutlineTopic } from "react-icons/md";
import { AddTopic } from "./add-topic";

const AddTopicPage = async () => {
  const user = await currentUser();

  const header: ReactNode = (
    <CardHeader className="border-b border-b-secondary">
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
            <CustomCardContent
              form={<AddTopic />}
              label={"Topic"}
              icon={<MdOutlineTopic size={320} />}
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

export default AddTopicPage;
