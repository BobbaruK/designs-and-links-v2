"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import { getLanguageById, getLanguageByIso } from "@/lib/data/dl";
import db from "@/lib/db";
import { LanguageSchema } from "@/lib/schemas";
import { z } from "zod";

export const addLanguage = async (values: z.infer<typeof LanguageSchema>) => {
  const user = await currentUser();

  const validatedFields = LanguageSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, englishName, iso_639_1, iso_3166_1, flag } =
    validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  const existingLanguage = await getLanguageByIso(iso_639_1);

  if (existingLanguage) return { error: "Language already exists!" };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    const addLanguage = await db.dL_Language.create({
      data: {
        name,
        englishName,
        iso_639_1,
        iso_3166_1,
        flag,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: "Language added!",
      slug: addLanguage.iso_639_1,
    };
  } catch (error) {
    return { error: "Could not add language!" };
  }
};

export const editLanguage = async (
  values: z.infer<typeof LanguageSchema>,
  id: string,
) => {
  const user = await currentUser();

  const validatedFields = LanguageSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, englishName, iso_639_1, iso_3166_1, flag } =
    validatedFields.data;

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

  const existingLanguage = await getLanguageById(id);

  if (!existingLanguage) {
    return { error: "Language does not exist" };
  }

  console.log("================");
  console.log("flag", flag);

  try {
    const updatedLanguage = await db.dL_Language.update({
      where: {
        id,
      },
      data: {
        name,
        englishName,
        iso_639_1,
        iso_3166_1,
        flag,
        updateUserId: userEditing?.id,
      },
    });

    return {
      success: "Language updated!",
      slug: updatedLanguage.iso_639_1,
    };
  } catch (error) {
    return { error: "Could not update language!" };
  }
};

export const deleteLanguage = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  try {
    await db.dL_Language.delete({
      where: { id },
    });

    return {
      success: "Language deleted!",
    };
  } catch (error) {
    return { error: "Could not delete language!" };
  }
};
