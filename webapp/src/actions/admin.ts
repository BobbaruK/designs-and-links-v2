"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const user = await currentUser();
  const dbUser = await getUserById(user?.id!);

  if (!dbUser) {
    return { error: "Forbidden!" };
  }

  if (user?.role === UserRole.ADMIN) {
    return { success: "Allowed!" };
  }

  return { error: "Forbidden!" };
};
