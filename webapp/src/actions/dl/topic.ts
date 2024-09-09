"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import db from "@/lib/db";
import { TopicSchema } from "@/lib/schemas";
import { z } from "zod";

export const addTopic = async (values: z.infer<typeof TopicSchema>) => {
  const user = await currentUser();

  const validatedFields = TopicSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, slug, description } = validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  const existingTopic = await db.dL_Topic.findUnique({
    where: {
      slug,
    },
  });

  if (existingTopic) return { error: "Topic already exists!" };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    const addTopic = await db.dL_Topic.create({
      data: {
        name,
        slug,
        description,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: "Topic added!",
      slug: addTopic.slug,
    };
  } catch (error) {
    return { error: "Could not add topic!" };
  }
};

export const editTopic = async (
  values: z.infer<typeof TopicSchema>,
  id: string,
) => {
  const user = await currentUser();

  const validatedFields = TopicSchema.safeParse(values);

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

  const existingTopic = await db.dL_Topic.findUnique({
    where: {
      id,
    },
  });

  if (!existingTopic) {
    return { error: "Topic does not exist" };
  }

  try {
    const updatedTopic = await db.dL_Topic.update({
      where: {
        id,
      },
      data: { name, slug, description, updateUserId: userEditing?.id },
    });

    return {
      success: "Topic updated!",
      slug: updatedTopic.slug,
    };
  } catch (error) {
    return { error: "Could not update topic!" };
  }
};

export const deleteTopic = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  try {
    await db.dL_Topic.delete({
      where: { id },
    });

    return {
      success: "Topic deleted!",
    };
  } catch (error) {
    return { error: "Could not delete topic!" };
  }
};
