import db from "@/lib/db";

/**
 * {@linkcode getBrandLogos}
 *
 * Find all brand logos
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getBrandLogos = async () => {
  try {
    const brandLogos = await db.dL_BrandLogo.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdBy: {
          omit: {
            password: false,
          },
        },
        updatedBy: {
          omit: {
            password: false,
          },
        },
      },
    });

    return brandLogos;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getBrandLogoById}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBrandLogoById = async (id: string) => {
  try {
    const brandLogo = await db.dL_BrandLogo.findUnique({
      where: {
        id,
      },
    });

    return brandLogo;
  } catch {
    return null;
  }
};
