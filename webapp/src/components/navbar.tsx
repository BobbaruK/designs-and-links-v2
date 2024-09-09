"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "./auth/user-button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full items-center justify-between">
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
          <Link href={"/license"}>License</Link>
        </Button>
        <Button
          asChild
          variant={pathname.startsWith("/lp-type") ? "default" : "outline"}
        >
          <Link href={"/lp-type"}>Landing page type</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
