import db from "@/lib/db";

/**
 * {@linkcode getUserAvatars}
 *
 * @param {string} slug - search in the database by slug
 *
 * Find all user avatars
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getUserAvatars = async () => {
  try {
    const userAvatars = await db.dL_UserAvatar.findMany({
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

    return userAvatars;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getUserAvatarById}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getUserAvatarById = async (id: string) => {
  try {
    const avatar = await db.dL_UserAvatar.findUnique({
      where: {
        id,
      },
    });

    return avatar;
  } catch {
    return null;
  }
};
