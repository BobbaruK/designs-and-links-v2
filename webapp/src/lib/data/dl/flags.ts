import db from "@/lib/db";

/**
 * {@linkcode getFlags}
 *
 * @param {string} slug - search in the database by slug
 *
 * Find all user avatars
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getFlags = async () => {
  try {
    const flags = await db.dL_Flag.findMany({
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

    return flags;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getFlagById}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getFlagById = async (id: string) => {
  try {
    const flag = await db.dL_Flag.findUnique({
      where: {
        id,
      },
    });

    return flag;
  } catch {
    return null;
  }
};
