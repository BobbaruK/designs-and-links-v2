"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import db from "@/lib/db";
import { UserAvatarSchema } from "@/lib/schemas";
import { z } from "zod";

export const addUserAvatar = async (
  values: z.infer<typeof UserAvatarSchema>,
) => {
  const user = await currentUser();

  const validatedFields = UserAvatarSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, url } = validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    await db.dL_UserAvatar.create({
      data: {
        name,
        url,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: "User avatar added!",
    };
  } catch (error) {
    return { error: "Could not add user avatar!" };
  }
};

export const adminEditUserAvatar = async (
  values: z.infer<typeof UserAvatarSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const validatedFields = UserAvatarSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, url } = validatedFields.data;

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: "Unauthorized!" };

  const editedUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!editedUser) {
    return { error: "User does not exists!" };
  }

  try {
    await db.dL_UserAvatar.update({
      where: {
        id,
      },
      data: { name, url, updateUserId: editedUser.id },
    });

    return {
      success: "User avatar updated!",
    };
  } catch (error) {
    return { error: "Could not update user avatar!" };
  }
};

export const adminDeleteUserAvatar = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: "Unauthorized!" };

  const existingAvatar = await db.dL_UserAvatar.findUnique({
    where: {
      id,
    },
  });

  if (!existingAvatar) return { error: "Avatar not found!" };

  await db.user.updateMany({
    where: { image: existingAvatar.url },
    data: { image: null },
  });

  try {
    await db.dL_UserAvatar.delete({
      where: { id },
    });

    return {
      success: "User avatar deleted!",
    };
  } catch (error) {
    return { error: "Could not delete user avatar!" };
  }
};
