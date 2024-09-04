"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { EditFormValidationSchema } from "@/lib/schemas";
import { z } from "zod";

export const editFormValidation = async (
  values: z.infer<typeof EditFormValidationSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  try {
    const updatedFormValidation = await db.dL_FormValidation.update({
      where: {
        id,
      },
      data: { ...values },
    });

    return {
      success: "Form validation updated!",
      slug: updatedFormValidation.slug,
    };
  } catch (error) {
    return { error: "Could not update form validation!" };
  }
};

export const addFormValidation = async (
  values: z.infer<typeof EditFormValidationSchema>,
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  try {
    const addFormValidation = await db.dL_FormValidation.create({
      data: { ...values },
    });

    return {
      success: "Form validation added!",
      slug: addFormValidation.slug,
    };
  } catch (error) {
    return { error: "Could not add form validation!" };
  }
};

export const deleteFormValidation = async (id: string) => {
  const user = await currentUser();

  if (!user) {
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
