"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import db from "@/lib/db";
import { LandingPageSchema } from "@/lib/schemas";
import { z } from "zod";

export const addLandingPage = async (
  values: z.infer<typeof LandingPageSchema>,
) => {
  const user = await currentUser();

  const validatedFields = LandingPageSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const {
    name,
    slug,
    url,
    whatsapp,
    fxoroFooter,
    requester,
    topic,
    design,
    subDesign,
    formValidation,
    license,
    lpType,
    language,
    brand,
  } = validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  const existingLandingPage = await db.dL_LandingPage.findUnique({
    where: {
      slug,
    },
  });

  if (existingLandingPage) return { error: "Landing page already exists!" };

  const userAdding = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  try {
    const addLandingPage = await db.dL_LandingPage.create({
      data: {
        name,
        slug,
        url,
        whatsapp,
        fxoroFooter,
        requesterId: requester || null,
        topicId: topic || null,
        designId: design || null,
        subDesignId: subDesign || null,
        formValidationId: formValidation || null,
        LicenseId: license || null,
        landingPageTypeId: lpType || null,
        languageId: language || null,
        brandId: brand || null,
        createdUserId: userAdding?.id,
        updateUserId: userAdding?.id,
      },
    });

    return {
      success: "Landing page added!",
      slug: addLandingPage.slug,
    };
  } catch (error) {
    return { error: "Could not add the landing page!" };
  }
};

export const editLandingPage = async (
  values: z.infer<typeof LandingPageSchema>,
  id: string,
) => {
  const user = await currentUser();

  const validatedFields = LandingPageSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const {
    name,
    slug,
    url,
    whatsapp,
    fxoroFooter,
    requester,
    topic,
    design,
    subDesign,
    formValidation,
    license,
    lpType,
    language,
    brand,
  } = validatedFields.data;

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

  const existingLandingPage = await db.dL_LandingPage.findUnique({
    where: {
      id,
    },
  });

  if (!existingLandingPage) {
    return { error: "Landing page does not exist" };
  }

  try {
    const updatedTopic = await db.dL_LandingPage.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
        url,
        whatsapp,
        fxoroFooter,
        requesterId: requester || null,
        topicId: topic || null,
        designId: design || null,
        subDesignId: subDesign || null,
        formValidationId: formValidation || null,
        LicenseId: license || null,
        landingPageTypeId: lpType || null,
        languageId: language || null,
        brandId: brand || null,
        updateUserId: userEditing?.id,
      },
    });

    return {
      success: "Topic updated!",
      slug: updatedTopic.slug,
    };
  } catch (error) {
    return { error: "Could not update landing page!" };
  }
};

export const deleteLandingPage = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser || (user.role !== "ADMIN" && user.role !== "EDITOR"))
    return { error: "Unauthorized!" };

  try {
    await db.dL_LandingPage.delete({
      where: { id },
    });

    return {
      success: "Landing page deleted!",
    };
  } catch (error) {
    return { error: "Could not delete landing page!" };
  }
};
