import db from "@/lib/db";

/**
 * {@linkcode getLicenses}
 *
 * @param {string} slug - search in the database by slug
 *
 * It also includes `createdBy` and `updatedBy` and ommits the passwords
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getLicenses = async () => {
  try {
    const licenses = await db.dL_License.findMany({
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
        LandingPages: {
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
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return licenses;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLicenseById}
 *
 * @param {string} id - search in the database by id
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getLicenseById = async (id: string) => {
  try {
    const license = await db.dL_License.findUnique({
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
        LandingPages: {
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
        },
      },
    });

    return license;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getLicenseBySlug}
 *
 * @param {string} slug - search in the database by slug
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getLicenseBySlug = async (slug: string) => {
  try {
    const license = await db.dL_License.findUnique({
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
        LandingPages: {
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
        },
      },
    });

    return license;
  } catch {
    return null;
  }
};
