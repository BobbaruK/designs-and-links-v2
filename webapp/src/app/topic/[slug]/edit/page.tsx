import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getTopicBySlug } from "@/lib/data/dl";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { EditTopic } from "./edit-topic";

interface Props {
  params: {
    slug: string;
  };
}

const EditTopicPage = async ({ params: { slug } }: Props) => {
  const user = await currentUser();

  const topic = await getTopicBySlug(slug);

  return (
    <div className="container flex flex-col gap-6">
      {!topic ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">Topic: {slug}</h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/topic"}
                  label={"Back to user avatars"}
                />
              </div>
            </CardHeader>
          </Card>
          <CustomAlert
            title={"Error!"}
            description={`Seems like the topic that you are looking for does not exist.`}
            variant="destructive"
          />
        </>
      ) : (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">
                  Edit topic: {topic?.name}
                </h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={`/topic/${slug}`}
                  label={`Back to topic ${"cutare"}`}
                />
              </div>
            </CardHeader>

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <CardContent>
                <EditTopic topic={topic} />
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

export default EditTopicPage;
