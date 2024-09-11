import db from "@/lib/db";

/**
 * {@linkcode getBrands}
 *
 * It also includes `createdBy` and `updatedBy` and ommits the passwords
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getBrands = async () => {
  try {
    const brands = await db.dL_Brand.findMany({
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

    return brands;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getBrandById}
 *
 * @param {string} id - search topics in the database by id
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getBrandById = async (id: string) => {
  try {
    const brand = await db.dL_Brand.findUnique({
      where: {
        id,
      },
    });

    return brand;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getBrandBySlug}
 *
 * @param {string} slug - search topics in the database by slug
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getBrandBySlug = async (slug: string) => {
  try {
    const brand = await db.dL_Brand.findUnique({
      where: {
        slug,
      },
    });

    return brand;
  } catch {
    return null;
  }
};
