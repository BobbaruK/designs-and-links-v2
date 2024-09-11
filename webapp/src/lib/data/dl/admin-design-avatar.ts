import db from "@/lib/db";

/**
 * {@linkcode getDesignAvatars}
 *
 * Find all brand logos
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getDesignAvatars = async () => {
  try {
    const designAvatars = await db.dL_DesignAvatar.findMany({
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

    return designAvatars;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getDesignAvatarById}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getDesignAvatarById = async (id: string) => {
  try {
    const designAvatar = await db.dL_DesignAvatar.findUnique({
      where: {
        id,
      },
    });

    return designAvatar;
  } catch {
    return null;
  }
};
