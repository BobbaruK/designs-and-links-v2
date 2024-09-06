import { currentRole } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const adminLayout = async ({ children }: Props) => {
  const role = await currentRole();

  if (role !== "ADMIN") redirect("/");

  return children;
};

export default adminLayout;
