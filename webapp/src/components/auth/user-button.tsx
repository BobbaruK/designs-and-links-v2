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
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { LogoutButton } from "./logout-button";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { LoginButton } from "./login-button";
import { IoIosLogIn } from "react-icons/io";

export const UserButton = () => {
  const user = useCurrentUser();

  const { setTheme, theme } = useTheme();
  const [theTheme, setTheTheme] = useState(theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-background text-foreground">
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {user && (
          <>
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                href={"/settings"}
                className="flex cursor-pointer items-center justify-start gap-2 p-2"
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
  );
};
