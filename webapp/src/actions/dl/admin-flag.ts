"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import db from "@/lib/db";
import { FlagSchema } from "@/lib/schemas";
import { z } from "zod";

export const adminAddFlag = async (values: z.infer<typeof FlagSchema>) => {
  const user = await currentUser();

  const validatedFields = FlagSchema.safeParse(values);

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
    await db.dL_Flag.create({
      data: {
        name,
        url,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: "Flag added!",
    };
  } catch (error) {
    return { error: "Could not add the flag!" };
  }
};

export const adminEditFlag = async (
  values: z.infer<typeof FlagSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const validatedFields = FlagSchema.safeParse(values);

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
    await db.dL_Flag.update({
      where: {
        id,
      },
      data: { name, url, updateUserId: editedUser.id },
    });

    return {
      success: "Flag updated!",
    };
  } catch (error) {
    return { error: "Could not update the flag!" };
  }
};

export const adminDeleteFlag = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: "Unauthorized!" };

  const existingFlag = await db.dL_Flag.findUnique({
    where: {
      id,
    },
  });

  if (!existingFlag) return { error: "Flag not found!" };

  try {
    await db.dL_Flag.delete({
      where: { id },
    });

    await db.dL_Language.updateMany({
      where: { flag: existingFlag.url },
      data: { flag: null },
    });

    return {
      success: "Flag deleted!",
    };
  } catch (error) {
    return { error: "Could not delete the flag!" };
  }
};
