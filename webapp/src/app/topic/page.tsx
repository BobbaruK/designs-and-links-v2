import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getTopics } from "@/lib/data/dl";
import { IoAddCircleSharp } from "react-icons/io5";
import { columns } from "./columns";

const TopicsPage = async () => {
  const user = await currentUser();

  const topics = await getTopics();

  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Topics</h1>

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <IconButton
                icon={<IoAddCircleSharp size={25} />}
                href={"/topic/add"}
                label={"Add topic"}
              />
            )}
          </div>
        </CardHeader>
      </Card>
      <DataTable
        columns={columns}
        data={topics!}
        columnVisibilityObj={{
          slug: false,
          description: false,
        }}
      />
    </div>
  );
};

export default TopicsPage;
