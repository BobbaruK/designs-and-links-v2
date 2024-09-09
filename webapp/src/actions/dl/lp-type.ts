"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import db from "@/lib/db";
import { LandingPageTypeSchema } from "@/lib/schemas";
import { z } from "zod";

export const addLandingPageType = async (
  values: z.infer<typeof LandingPageTypeSchema>,
) => {
  const user = await currentUser();

  const validatedFields = LandingPageTypeSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, slug, description } = validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  const existingTopic = await db.dL_LandingPageType.findUnique({
    where: {
      slug,
    },
  });

  if (existingTopic) return { error: "Landing page type already exists!" };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    const addTopic = await db.dL_LandingPageType.create({
      data: {
        name,
        slug,
        description,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: "Landing page type added!",
      slug: addTopic.slug,
    };
  } catch (error) {
    return { error: "Could not add landing page type!" };
  }
};

export const editLandingPageType = async (
  values: z.infer<typeof LandingPageTypeSchema>,
  id: string,
) => {
  const user = await currentUser();

  const validatedFields = LandingPageTypeSchema.safeParse(values);

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

  const existingTopic = await db.dL_LandingPageType.findUnique({
    where: {
      id,
    },
  });

  if (!existingTopic) {
    return { error: "Landing page type does not exist" };
  }

  try {
    const updatedTopic = await db.dL_LandingPageType.update({
      where: {
        id,
      },
      data: { name, slug, description, updateUserId: userEditing?.id },
    });

    return {
      success: "Landing page type updated!",
      slug: updatedTopic.slug,
    };
  } catch (error) {
    return { error: "Could not update landing page type!" };
  }
};

export const deleteLandingPageType = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  try {
    await db.dL_LandingPageType.delete({
      where: { id },
    });

    return {
      success: "Landing page type deleted!",
    };
  } catch (error) {
    return { error: "Could not delete landing page type!" };
  }
};
