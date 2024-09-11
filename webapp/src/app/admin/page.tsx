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
        <CardContent className="flex flex-row flex-wrap items-center justify-start gap-4">
          <Button asChild>
            <Link href={"/admin/users"}>Users</Link>
          </Button>
          <Button asChild>
            <Link href={"/admin/user-avatars"}>User Avatars</Link>
          </Button>
          <Button asChild>
            <Link href={"/admin/flags"}>Flags</Link>
          </Button>
          <Button asChild>
            <Link href={"/admin/brand-logos"}>Brand Logos</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
