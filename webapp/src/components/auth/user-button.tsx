"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GrUserAdmin } from "react-icons/gr";
import { IoIosLogIn } from "react-icons/io";
import { IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { CustomAvatar } from "../custom-avatar";
import { LoginButton } from "./login-button";
import { LogoutButton } from "./logout-button";

export const UserButton = () => {
  const user = useCurrentUser();
  const pathname = usePathname();

  const { setTheme, theme } = useTheme();
  const [theTheme, setTheTheme] = useState(theme);

  const image = user?.image;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CustomAvatar image={image} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {user && (
            <>
              <DropdownMenuLabel>{user?.name || user.email}</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link
                  href={"/settings"}
                  className={cn(
                    "flex cursor-pointer items-center justify-start gap-2 p-2",
                    pathname === "/settings"
                      ? "underline underline-offset-4"
                      : "",
                  )}
                >
                  <IoSettingsOutline /> Settings
                </Link>
              </DropdownMenuItem>
              {user.role === "ADMIN" && (
                <DropdownMenuItem asChild>
                  <Link
                    href={"/admin"}
                    className={cn(
                      "flex cursor-pointer items-center justify-start gap-2 p-2",
                      pathname.startsWith("/admin")
                        ? "underline underline-offset-4"
                        : "",
                    )}
                  >
                    <GrUserAdmin /> Admin
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={theTheme} onValueChange={setTheTheme}>
            <DropdownMenuRadioItem
              value="light"
              onClick={() => setTheme("light")}
              className="cursor-pointer"
            >
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="dark"
              onClick={() => setTheme("dark")}
              className="cursor-pointer"
            >
              Dark
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="system"
              onClick={() => setTheme("system")}
              className="cursor-pointer"
            >
              System
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          {user ? (
            <>
              <DropdownMenuSeparator />
              <LogoutButton>
                <DropdownMenuItem className="flex cursor-pointer items-center justify-start gap-3 p-2">
                  <IoExitOutline /> Logout
                </DropdownMenuItem>
              </LogoutButton>
            </>
          ) : (
            <>
              <DropdownMenuSeparator />
              <LoginButton>
                <DropdownMenuItem className="flex cursor-pointer items-center justify-start gap-3 p-2">
                  <IoIosLogIn /> Login
                </DropdownMenuItem>
              </LoginButton>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
