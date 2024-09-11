"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import db from "@/lib/db";
import { BrandSchema } from "@/lib/schemas";
import { z } from "zod";

export const addBrand = async (values: z.infer<typeof BrandSchema>) => {
  const user = await currentUser();

  const validatedFields = BrandSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, slug, logo } = validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  const existingBrand = await db.dL_Brand.findUnique({
    where: {
      slug,
    },
  });

  if (existingBrand) return { error: "Brand already exists!" };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    const addTopic = await db.dL_Brand.create({
      data: {
        name,
        slug,
        logo,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: "Brand added!",
      slug: addTopic.slug,
    };
  } catch (error) {
    return { error: "Could not add the brand!" };
  }
};

export const editBrand = async (
  values: z.infer<typeof BrandSchema>,
  id: string,
) => {
  const user = await currentUser();

  const validatedFields = BrandSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, slug, logo } = validatedFields.data;

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

  const existingBrand = await db.dL_Brand.findUnique({
    where: {
      id,
    },
  });

  if (!existingBrand) {
    return { error: "Brand does not exist" };
  }

  try {
    const updatedTopic = await db.dL_Brand.update({
      where: {
        id,
      },
      data: { name, slug, logo, updateUserId: userEditing?.id },
    });

    return {
      success: "Brand updated!",
      slug: updatedTopic.slug,
    };
  } catch (error) {
    return { error: "Could not update the brand!" };
  }
};

export const deleteBrand = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  try {
    await db.dL_Brand.delete({
      where: { id },
    });

    return {
      success: "Brand deleted!",
    };
  } catch (error) {
    return { error: "Could not delete brand!" };
  }
};
