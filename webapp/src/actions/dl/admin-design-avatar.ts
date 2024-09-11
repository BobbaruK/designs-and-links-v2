"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import db from "@/lib/db";
import { DesignAvatarSchema } from "@/lib/schemas";
import { z } from "zod";

export const adminAddDesignAvatar = async (
  values: z.infer<typeof DesignAvatarSchema>,
) => {
  const user = await currentUser();

  const validatedFields = DesignAvatarSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, url } = validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser && user.role !== "ADMIN") return { error: "Unauthorized!" };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    await db.dL_DesignAvatar.create({
      data: {
        name,
        url,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: "Design avatar added!",
    };
  } catch (error) {
    return { error: "Could not add the design avatar!" };
  }
};

export const adminEditDesignAvatar = async (
  values: z.infer<typeof DesignAvatarSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const validatedFields = DesignAvatarSchema.safeParse(values);

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
    await db.dL_DesignAvatar.update({
      where: {
        id,
      },
      data: { name, url, updateUserId: editedUser.id },
    });

    return {
      success: "Design avatar updated!",
    };
  } catch (error) {
    return { error: "Could not update the design avatar!" };
  }
};

export const adminDeleteDesignAvatar = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: "Unauthorized!" };

  const existingDesignAvatar = await db.dL_DesignAvatar.findUnique({
    where: {
      id,
    },
  });

  if (!existingDesignAvatar) return { error: "Design avatar not found!" };

  try {
    await db.dL_DesignAvatar.delete({
      where: { id },
    });

    // await db.dL_Brand.updateMany({
    //   where: { logo: existingDesignAvatar.url },
    //   data: { logo: null },
    // });

    return {
      success: "Design avatar deleted!",
    };
  } catch (error) {
    return { error: "Could not delete the design avatar!" };
  }
};
