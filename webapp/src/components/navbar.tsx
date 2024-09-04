"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton } from "./auth/user-button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === "/" ? "default" : "outline"}>
          <Link href={"/"}>Home</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href={"/server"}>Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href={"/client"}>Client</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href={"/admin"}>Admin</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
