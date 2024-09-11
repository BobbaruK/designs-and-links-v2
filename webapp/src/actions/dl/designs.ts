"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import {
  getDesignById,
  getDesignBySlug,
  getSubDesignById,
  getSubDesignBySlug,
} from "@/lib/data/dl";
import db from "@/lib/db";
import { DesignSchema } from "@/lib/schemas";
import { z } from "zod";

export const addDesign = async (values: z.infer<typeof DesignSchema>) => {
  const user = await currentUser();

  const validatedFields = DesignSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, slug, avatar } = validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  const existingDesign = await getDesignBySlug(slug);

  if (existingDesign) return { error: "Design already exists!" };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    const addDesign = await db.dL_Design.create({
      data: {
        name,
        slug,
        avatar,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: "Design added!",
      slug: addDesign.slug,
    };
  } catch (error) {
    return { error: "Could not add design!" };
  }
};

export const addSubDesign = async (values: z.infer<typeof DesignSchema>) => {
  const user = await currentUser();

  const validatedFields = DesignSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, slug, avatar, isSubDesign } = validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  const existingDesign = await getSubDesignBySlug(slug);

  if (existingDesign) return { error: "Sub design already exists!" };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    const addDesign = await db.dL_SubDesign.create({
      data: {
        name,
        slug,
        avatar,
        DL_DesignId: isSubDesign,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: "Sub Design added!",
      slug: addDesign.slug,
    };
  } catch (error) {
    return { error: "Could not add sub design!" };
  }
};

export const editDesign = async (
  values: z.infer<typeof DesignSchema>,
  id: string,
) => {
  const user = await currentUser();

  const validatedFields = DesignSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, slug, avatar, isSubDesign } = validatedFields.data;

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

  const existingDesign = await getDesignById(id);

  if (!existingDesign) {
    return { error: "Design does not exist" };
  }

  try {
    if (!isSubDesign) {
      const updatedDesign = await db.dL_Design.update({
        where: {
          id,
        },
        data: {
          name,
          slug,
          avatar,
          updateUserId: userEditing?.id,
        },
      });

      return {
        success: "Design updated!",
        slug: updatedDesign.slug,
      };
    } else {
      const deletedDesign = await db.dL_Design.delete({
        where: {
          id,
        },
      });

      const newSubDesign = await db.dL_SubDesign.create({
        data: {
          name: deletedDesign.name,
          createdAt: deletedDesign.createdAt,
          slug: deletedDesign.slug,
          avatar: deletedDesign.avatar,
          updateUserId: user.id,
          createdUserId: deletedDesign.createdUserId,
          DL_DesignId: isSubDesign,
        },
      });

      return {
        success: "Design updated!",
        slug: newSubDesign.slug,
      };
    }
  } catch (error) {
    return { error: "Could not update design!" };
  }
};

export const editSubDesign = async (
  values: z.infer<typeof DesignSchema>,
  id: string,
) => {
  const user = await currentUser();

  const validatedFields = DesignSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, slug, avatar, isSubDesign } = validatedFields.data;

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

  const existingDesign = await getSubDesignById(id);

  if (!existingDesign) {
    return { error: "Sub Design does not exist" };
  }

  try {
    if (!isSubDesign) {
      const deletedSubDesign = await db.dL_SubDesign.delete({
        where: {
          id,
        },
        include: {
          createdBy: {
            omit: {
              password: true,
            },
          },
          updatedBy: {
            omit: {
              password: true,
            },
          },
          DL_Design: true,
        },
      });

      const newDesign = await db.dL_Design.create({
        data: {
          name: deletedSubDesign.name,
          slug: deletedSubDesign.slug,
          avatar: deletedSubDesign.avatar,
          createdAt: deletedSubDesign.createdAt,
          createdUserId: deletedSubDesign.createdUserId,
          updateUserId: user.id,
        },
      });

      return {
        success: "Sub Design updated!",
        slug: newDesign.slug, // TODO: hmmmmmm
      };
    } else {
      const updatedDesign = await db.dL_SubDesign.update({
        where: {
          id,
        },
        data: {
          name,
          slug,
          avatar,
          updateUserId: userEditing?.id,
          DL_DesignId: isSubDesign,
        },
      });

      return {
        success: "Sub Design updated!",
        slug: updatedDesign.slug,
      };
    }
  } catch (error) {
    return { error: "Could not update sub design!" };
  }
};

export const deleteDesign = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  try {
    await db.dL_Design.delete({
      where: { id },
    });

    return {
      success: "Design deleted!",
    };
  } catch (error) {
    return { error: "Could not delete design!" };
  }
};

export const deleteSubDesign = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  try {
    await db.dL_SubDesign.delete({
      where: { id },
    });

    return {
      success: "Sub Design deleted!",
    };
  } catch (error) {
    return { error: "Could not delete sub design!" };
  }
};
