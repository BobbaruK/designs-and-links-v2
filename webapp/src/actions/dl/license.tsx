"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import db from "@/lib/db";
import { LicenseSchema } from "@/lib/schemas";
import { z } from "zod";

export const addLicense = async (values: z.infer<typeof LicenseSchema>) => {
  const user = await currentUser();

  const validatedFields = LicenseSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, slug, description } = validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  const existingLicense = await db.dL_License.findUnique({
    where: {
      slug,
    },
  });

  if (existingLicense) return { error: "License already exists!" };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    const addLicense = await db.dL_License.create({
      data: {
        name,
        slug,
        description,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: "License added!",
      slug: addLicense.slug,
    };
  } catch (error) {
    return { error: "Could not add license!" };
  }
};

export const editLicense = async (
  values: z.infer<typeof LicenseSchema>,
  id: string,
) => {
  const user = await currentUser();

  const validatedFields = LicenseSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, slug, description } = validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  const userEditing = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  const existingLicense = await db.dL_License.findUnique({
    where: {
      id,
    },
  });

  if (!existingLicense) {
    return { error: "License does not exist" };
  }

  try {
    const updatedLicense = await db.dL_License.update({
      where: {
        id,
      },
      data: { name, slug, description, updateUserId: userEditing?.id },
    });

    return {
      success: "License updated!",
      slug: updatedLicense.slug,
    };
  } catch (error) {
    return { error: "Could not update license!" };
  }
};

export const deleteLicense = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  try {
    await db.dL_License.delete({
      where: { id },
    });

    return {
      success: "License deleted!",
    };
  } catch (error) {
    return { error: "Could not delete license!" };
  }
};
