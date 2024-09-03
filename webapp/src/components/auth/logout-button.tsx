"use client";

import { logout } from "@/actions/logout";
import { ReactNode } from "react";
import { signOut } from "next-auth/react";

interface Props {
  children?: ReactNode;
}

export const LogoutButton = ({ children }: Props) => {
  const onClick = () => logout();

  return (
    <span onClick={() => signOut()} className="cursor-pointer">
      {children}
    </span>
  );
};
