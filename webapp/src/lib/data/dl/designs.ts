import db from "@/lib/db";

/**
 * {@linkcode getDesigns}
 *
 * It also includes `createdBy` and `updatedBy` and ommits the passwords
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getDesigns = async () => {
  try {
    const designs = await db.dL_Design.findMany({
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
        subDesigns: {
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

    return designs;
  } catch {
    return null;
  }
};
/**
 * {@linkcode getDesigns}
 *
 * It also includes `createdBy` and `updatedBy` and ommits the passwords
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getSubDesigns = async () => {
  try {
    const subDesigns = await db.dL_SubDesign.findMany({
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

    return subDesigns;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getDesignById}
 *
 * @param {string} id - search topics in the database by id
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getDesignById = async (id: string) => {
  try {
    const design = await db.dL_Design.findUnique({
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
        subDesigns: {
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
        },
      },
    });

    return design;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getSubDesignById}
 *
 * @param {string} id - search topics in the database by id
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getSubDesignById = async (id: string) => {
  try {
    const design = await db.dL_SubDesign.findUnique({
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

    return design;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getDesignBySlug}
 *
 * @param {string} slug - search topics in the database by slug
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getDesignBySlug = async (slug: string) => {
  try {
    const design = await db.dL_Design.findUnique({
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
        subDesigns: {
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
        },
      },
    });

    return design;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getSubDesignBySlug}
 *
 * @param {string} slug - search topics in the database by slug
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getSubDesignBySlug = async (slug: string) => {
  try {
    const design = await db.dL_SubDesign.findUnique({
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

    return design;
  } catch {
    return null;
  }
};
