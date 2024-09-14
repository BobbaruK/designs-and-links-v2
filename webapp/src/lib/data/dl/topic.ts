import db from "@/lib/db";

/**
 * {@linkcode getTopics}
 *
 * It also includes `createdBy` and `updatedBy` and ommits the passwords
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getTopics = async () => {
  try {
    const topics = await db.dL_Topic.findMany({
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

    return topics;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getTopicById}
 *
 * @param {string} id - search topics in the database by id
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getTopicById = async (id: string) => {
  try {
    const topic = await db.dL_Topic.findUnique({
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

    return topic;
  } catch {
    return null;
  }
};

/**
 * {@linkcode getTopicBySlug}
 *
 * @param {string} slug - search topics in the database by slug
 * @yields a `Promise` that resolve in an formValidation `Object`
 */
export const getTopicBySlug = async (slug: string) => {
  try {
    const topic = await db.dL_Topic.findUnique({
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

    return topic;
  } catch {
    return null;
  }
};
