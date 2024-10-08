import { IconButton } from "@/components/button-icon";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getLanguages } from "@/lib/data/dl/language";
import { IoAddCircleSharp } from "react-icons/io5";
import { columns } from "./columns";

const LanguagePage = async () => {
  const user = await currentUser();

  const languages = await getLanguages();

  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Languages</h1>

            {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
              <IconButton
                icon={<IoAddCircleSharp size={25} />}
                href={"/language/add"}
                label={"Add language"}
              />
            )}
          </div>
        </CardHeader>
      </Card>
      <DataTable
        columns={columns}
        data={languages!}
        columnVisibilityObj={{
          slug: false,
          description: false,
        }}
      />
    </div>
  );
};

export default LanguagePage;
