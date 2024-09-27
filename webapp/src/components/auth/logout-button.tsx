"use client";

import { logout } from "@/actions/logout";
import { ReactNode } from "react";

/**
 * signOut sends you to localhost:3000. this
 * project has ports mapped to 3001 and 5433
 */
// import { signOut } from "next-auth/react";

interface Props {
  children?: ReactNode;
}

export const LogoutButton = ({ children }: Props) => {
  const onClick = () => logout();

  return (
    <span onClick={() => onClick()} className="cursor-pointer">
      {children}
    </span>
  );
};
