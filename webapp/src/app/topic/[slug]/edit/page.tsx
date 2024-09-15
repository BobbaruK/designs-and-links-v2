import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { CustomCardContent } from "@/components/custom-card-content";
import { Card, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getTopicBySlug } from "@/lib/data/dl";
import { ReactNode } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { MdOutlineTopic } from "react-icons/md";
import { EditTopic } from "./edit-topic";

interface Props {
  params: {
    slug: string;
  };
}

const EditTopicPage = async ({ params: { slug } }: Props) => {
  const user = await currentUser();

  const topic = await getTopicBySlug(slug);

  const header: ReactNode = (
    <CardHeader className="border-b border-b-secondary">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">
          {!topic ? `Topic: ${slug}` : topic.name}
        </h1>
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
      {!topic ? (
        <>
          <Card>{header}</Card>
          <CustomAlert title={"Error!"} asset="topic" variant="destructive" />
        </>
      ) : (
        <>
          <Card>
            {header}

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <CustomCardContent
                form={<EditTopic topic={topic} />}
                label={topic?.name}
                icon={<MdOutlineTopic size={320} />}
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

export default EditTopicPage;
