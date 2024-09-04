import { UserRole } from "@prisma/client";

export const userRoles = () => {
  const VALUES = [UserRole.ADMIN, UserRole.EDITOR, UserRole.USER] as const;

  return VALUES;
};
