import db from "@/lib/db";

/**
 * {@linkcode getLandingPageTypes}
 *
 * It also includes `createdBy` and `updatedBy` and ommits the passwords
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getLandingPageTypes = async () => {
  try {
    const lpTypes = await db.dL_LandingPageType.findMany({
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return lpTypes;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLandingPageTypeById}
 *
 * @param {string} id - search topics in the database by id
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getLandingPageTypeById = async (id: string) => {
  try {
    const lpType = await db.dL_LandingPageType.findUnique({
      where: {
        id,
      },
    });

    return lpType;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLandingPageTypeBySlug}
 *
 * @param {string} slug - search topics in the database by slug
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getLandingPageTypeBySlug = async (slug: string) => {
  try {
    const lpType = await db.dL_LandingPageType.findUnique({
      where: {
        slug,
      },
    });

    return lpType;
  } catch {
    return null;
  }
};
