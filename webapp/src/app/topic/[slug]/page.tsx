import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/landing-page-columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getTopicBySlug } from "@/lib/data/dl";
import db from "@/lib/db";
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

  const header: ReactNode = (
    <CardHeader>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">
          {!topic ? `Topic: ${slug}` : topic.name}
        </h1>
        <div className="flex gap-4">
          {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
            <IconButton
              icon={<CiEdit size={25} />}
              href={`/topic/${topic?.slug}/edit`}
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
            <CardContent>
              <p>
                {topic.description || (
                  <span className="italic">There is no description added</span>
                )}
              </p>
              {/* <pre>{JSON.stringify(formValidation, undefined, 2)}</pre> */}
            </CardContent>
          </Card>
          <DataTable
            columns={columns}
            data={topic.LandingPages!}
            columnVisibilityObj={{
              slug: false,
              fxoroFooter: false,
              topic: false,
              requester: false,
              createdAt: false,
              createdBy: false,
              updatedAt: false,
              updatedBy: false,
            }}
          />
        </>
      )}
    </div>
  );
};

export default TopicPage;
