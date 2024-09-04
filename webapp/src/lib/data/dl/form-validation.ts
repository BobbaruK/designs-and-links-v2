import db from "@/lib/db";

/**
 * {@linkcode getFormValidationBySlug}
 *
 * @param {string} slug - search in the database by slug
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getAllFormValidation = async () => {
  try {
    const formValidations = await db.dL_FormValidation.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return formValidations;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getFormValidationById}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getFormValidationById = async (id: string) => {
  try {
    const formValidation = await db.dL_FormValidation.findUnique({
      where: {
        id,
      },
    });

    return formValidation;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getFormValidationBySlug}
 *
 * @param {string} slug - search in the database by slug
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getFormValidationBySlug = async (slug: string) => {
  try {
    const formValidation = await db.dL_FormValidation.findUnique({
      where: {
        slug,
      },
    });

    return formValidation;
  } catch {
    return null;
  }
};
