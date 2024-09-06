"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import db from "@/lib/db";
import { EditFormValidationSchema } from "@/lib/schemas";
import { use } from "react";
import { z } from "zod";

export const addFormValidation = async (
  values: z.infer<typeof EditFormValidationSchema>,
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }
  if (user.role !== "ADMIN" && user.role !== "EDITOR")
    return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: "Unauthorized!" };
  }

  const existingFormValidation = await db.dL_FormValidation.findUnique({
    where: {
      slug: values.slug,
    },
  });

  if (existingFormValidation)
    return { error: "Form validation already exists!" };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    const addFormValidation = await db.dL_FormValidation.create({
      data: {
        ...values,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: "Form validation added!",
      slug: addFormValidation.slug,
    };
  } catch (error) {
    return { error: "Could not add form validation!" };
  }
};

export const editFormValidation = async (
  values: z.infer<typeof EditFormValidationSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  if (user.role !== "ADMIN") return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: "Unauthorized!" };
  }

  const userEditing = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  const existingFormValidation = await db.dL_FormValidation.findUnique({
    where: {
      id,
    },
  });

  if (!existingFormValidation) {
    return { error: "Form validation does not exist" };
  }

  try {
    const updatedFormValidation = await db.dL_FormValidation.update({
      where: {
        id,
      },
      data: { ...values, updateUserId: userEditing?.id },
    });

    return {
      success: "Form validation updated!",
      slug: updatedFormValidation.slug,
    };
  } catch (error) {
    return { error: "Could not update form validation!" };
  }
};

export const deleteFormValidation = async (id: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: "Unauthorized!" };
  }

  try {
    await db.dL_FormValidation.delete({
      where: { id },
    });

    return {
      success: "Form validation deleted!",
    };
  } catch (error) {
    return { error: "Could not delete form validation!" };
  }
};
