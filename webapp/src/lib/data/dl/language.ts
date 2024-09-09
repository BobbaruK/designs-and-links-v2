import db from "@/lib/db";

/**
 * {@linkcode getLanguages}
 *
 * It also includes `createdBy` and `updatedBy` and ommits the passwords
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getLanguages = async () => {
  try {
    const language = await db.dL_Language.findMany({
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

    return language;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLanguageById}
 *
 * @param {string} id - search topics in the database by id
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getLanguageById = async (id: string) => {
  try {
    const language = await db.dL_Language.findUnique({
      where: {
        id,
      },
    });

    return language;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLanguageByFlag}
 *
 * @param {string} flag - search topics in the database by slug
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getLanguageByFlag = async (flag: string) => {
  try {
    const language = await db.dL_Language.findMany({
      where: {
        flag,
      },
    });

    return language;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLanguageByIso}
 *
 * @param {string} iso - search topics in the database by slug
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getLanguageByIso = async (iso: string) => {
  try {
    const language = await db.dL_Language.findUnique({
      where: {
        iso_639_1: iso,
      },
    });

    return language;
  } catch {
    return null;
  }
};
