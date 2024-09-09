import { CustomAlert } from "@/components/alert-custom";
import { IconButton } from "@/components/button-icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getFormValidationBySlug, getTopicBySlug } from "@/lib/data/dl";
import { ReactNode } from "react";
import { CiEdit } from "react-icons/ci";
import { IoArrowBackCircleSharp } from "react-icons/io5";

interface Props {
  params: {
    slug: string;
  };
}

const TopicPage = async ({ params: { slug } }: Props) => {
  const topic = await getTopicBySlug(slug);
  const user = await currentUser();

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
                  label={"Back to topics"}
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
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-4xl font-bold">Topic: {topic.name}</h1>
              <div className="ms-auto flex items-center justify-center gap-4">
                {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
                  <IconButton
                    icon={<CiEdit size={25} />}
                    href={`/topic/${topic.slug}/edit`}
                    label={"Edit topic"}
                  />
                )}
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/topic"}
                  label={"Back to topics"}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>
              {topic.description || (
                <span className="italic">There is no description added</span>
              )}
            </p>
            {/* <pre>{JSON.stringify(formValidation, undefined, 2)}</pre> */}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TopicPage;
