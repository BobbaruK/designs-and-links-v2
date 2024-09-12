import db from "@/lib/db";

/**
 * {@linkcode getLandingPages}
 *
 * It also includes `createdBy` and `updatedBy` and ommits the passwords
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getLandingPages = async () => {
  try {
    const landingPage = await db.dL_LandingPage.findMany({
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
        brand: true,
        design: true,
        formValidation: true,
        language: true,
        license: true,
        lpType: true,
        requester: {
          omit: {
            password: true,
          },
        },
        subDesign: true,
        topic: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return landingPage;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLandinPageById}
 *
 * @param {string} id - search topics in the database by id
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getLandinPageById = async (id: string) => {
  try {
    const landingPage = await db.dL_LandingPage.findUnique({
      where: {
        id,
      },
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
        brand: true,
        design: true,
        formValidation: true,
        language: true,
        license: true,
        lpType: true,
        requester: {
          omit: {
            password: true,
          },
        },
        subDesign: true,
        topic: true,
      },
    });

    return landingPage;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLandingPageBySlug}
 *
 * @param {string} slug - search topics in the database by slug
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getLandingPageBySlug = async (slug: string) => {
  try {
    const landingPage = await db.dL_LandingPage.findUnique({
      where: {
        slug,
      },
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
        brand: true,
        design: true,
        formValidation: true,
        language: true,
        license: true,
        lpType: true,
        requester: {
          omit: {
            password: true,
          },
        },
        subDesign: true,
        topic: true,
      },
    });

    return landingPage;
  } catch {
    return null;
  }
};
