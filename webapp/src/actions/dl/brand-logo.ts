"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import db from "@/lib/db";
import { BrandLogoSchema } from "@/lib/schemas";
import { z } from "zod";

export const adminAddBrandLogo = async (
  values: z.infer<typeof BrandLogoSchema>,
) => {
  const user = await currentUser();

  const validatedFields = BrandLogoSchema.safeParse(values);

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
    await db.dL_BrandLogo.create({
      data: {
        name,
        url,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: "Brand logo added!",
    };
  } catch (error) {
    return { error: "Could not add the brand logo!" };
  }
};

export const adminEditBrandLogo = async (
  values: z.infer<typeof BrandLogoSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const validatedFields = BrandLogoSchema.safeParse(values);

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
    await db.dL_BrandLogo.update({
      where: {
        id,
      },
      data: { name, url, updateUserId: editedUser.id },
    });

    return {
      success: "Brand logo updated!",
    };
  } catch (error) {
    return { error: "Could not update the brand logo!" };
  }
};

export const adminDeleteBrandLogo = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: "Unauthorized!" };

  const existingBrandLogo = await db.dL_BrandLogo.findUnique({
    where: {
      id,
    },
  });

  if (!existingBrandLogo) return { error: "Brand logo not found!" };

  // await db.dL_Language.updateMany({
  //   where: { flag: existingFlag.url },
  //   data: { flag: null },
  // });

  try {
    await db.dL_BrandLogo.delete({
      where: { id },
    });

    return {
      success: "Brand logo deleted!",
    };
  } catch (error) {
    return { error: "Could not delete the brand logo!" };
  }
};
