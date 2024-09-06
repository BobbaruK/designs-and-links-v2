import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const AdminPage = () => {
  return (
    <div className="container flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">Admin area</h1>
          </div>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href={"/admin/users"}>Users</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
