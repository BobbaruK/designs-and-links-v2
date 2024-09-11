"use client";

import { AdminNavigation } from "@/components/admin-navigation";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { useCurrentRole } from "@/hooks/use-current-role";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const role = useCurrentRole();

  return (
    <nav className="w-full space-y-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-x-2">
          <Button asChild variant={pathname === "/" ? "default" : "outline"}>
            <Link href={"/"}>Home</Link>
          </Button>
          <Button
            asChild
            variant={
              pathname.startsWith("/form-validation") ? "default" : "outline"
            }
          >
            <Link href={"/form-validation"}>Form validations</Link>
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/topic") ? "default" : "outline"}
          >
            <Link href={"/topic"}>Topics</Link>
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/license") ? "default" : "outline"}
          >
            <Link href={"/license"}>Licenses</Link>
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/lp-type") ? "default" : "outline"}
          >
            <Link href={"/lp-type"}>Landing page type</Link>
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/language") ? "default" : "outline"}
          >
            <Link href={"/language"}>Languages</Link>
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/brand") ? "default" : "outline"}
          >
            <Link href={"/brand"}>Brands</Link>
          </Button>
        </div>
        <UserButton />
      </div>
      {role === "ADMIN" && <AdminNavigation />}
    </nav>
  );
};
