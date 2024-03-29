import { getSelf } from "./auth-service";
import { db } from "./db";

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    if (self) {
      userId = self.id;
    }
  } catch (e) {
    console.error(e);
    userId = null;
  }

  if (userId) {
    const users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followers: {
                some: {
                  followerId: userId,
                },
              },
            },
          }
        ],
      },
      orderBy: {
        createdAt: "desc",
      },

     
    });
    return users;
  }

  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return users;
};
