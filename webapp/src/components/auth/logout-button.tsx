"use client";

import { ReactNode } from "react";
import { signOut } from "next-auth/react";

interface Props {
  children?: ReactNode;
}

export const LogoutButton = ({ children }: Props) => {
  return (
    <span onClick={() => signOut()} className="cursor-pointer">
      {children}
    </span>
  );
};
