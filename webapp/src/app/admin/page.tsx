import { AdminNavigation } from "@/components/admin-navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AdminPage = () => {
  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Admin area</h1>
          </div>
        </CardHeader>
        <CardContent className="flex flex-row flex-wrap items-center justify-start gap-4">
          <AdminNavigation />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
