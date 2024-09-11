"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-x-2">
      <Button
        asChild
        variant={pathname.startsWith("/admin/users") ? "default" : "secondary"}
      >
        <Link href={"/admin/users"}>Users</Link>
      </Button>
      <Button
        asChild
        variant={
          pathname.startsWith("/admin/user-avatars") ? "default" : "secondary"
        }
      >
        <Link href={"/admin/user-avatars"}>User Avatars</Link>
      </Button>
      <Button
        asChild
        variant={pathname.startsWith("/admin/flags") ? "default" : "secondary"}
      >
        <Link href={"/admin/flags"}>Flags</Link>
      </Button>
      <Button
        asChild
        variant={
          pathname.startsWith("/admin/brand-logos") ? "default" : "secondary"
        }
      >
        <Link href={"/admin/brand-logos"}>Brand Logos</Link>
      </Button>
    </div>
  );
};
