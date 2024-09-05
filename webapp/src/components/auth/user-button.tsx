"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { LoginButton } from "./login-button";
import { LogoutButton } from "./logout-button";
import { cn } from "@/lib/utils";
import { CustomAvatar } from "../custom-avatar";

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
        <DropdownMenuContent align="end" className="w-40">
          {user && (
            <>
              <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
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
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <LoginButton>
                <DropdownMenuItem className="flex cursor-pointer items-center justify-start gap-3 p-2">
                  <IoIosLogIn /> Login
                </DropdownMenuItem>
              </LoginButton>
            </DropdownMenuContent>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
