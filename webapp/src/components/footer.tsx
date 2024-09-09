import Link from "next/link";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="py-4">
      <div className="container flex items-center justify-between">
        footer
        <nav className="">
          <div className="flex gap-x-2">
            <Button asChild variant={"link"} className="text-foreground">
              <Link href={"/test-server"}>Server</Link>
            </Button>
            <Button asChild variant={"link"} className="text-foreground">
              <Link href={"/test-client"}>Client</Link>
            </Button>
            <Button asChild variant={"link"} className="text-foreground">
              <Link href={"/test-admin"}>Admin</Link>
            </Button>
          </div>
        </nav>
      </div>
    </footer>
  );
};
