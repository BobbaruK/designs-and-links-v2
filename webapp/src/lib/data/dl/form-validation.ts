import db from "@/lib/db";

/**
 * {@linkcode getFormValidationBySlug}
 *
 * @param {string} slug - search in the database by slug
 *
 * It also includes `createdBy` and `updatedBy` and ommits the passwords
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getFormValidations = async () => {
  try {
    const formValidations = await db.dL_FormValidation.findMany({
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

    return formValidation;
  } catch {
    return null;
  }
};
