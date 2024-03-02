"use server";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();
    if (!self) {
      throw new Error("User not found");
    }
    if (self) {
      if (self.id === id) {
        return true;
      }
      const following = await db.follow.findFirst({
        where: {
          followerId: self.id,
          followingId: id,
        },
      });

      return !!following;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
  return false;
};

export const followUser = async (id: string) => {
  const self = await getSelf();
    const otherUser = await db.user.findUnique({
        where: {id}
    });
    if(!otherUser){
        throw new Error("User not found");
    }
    if(otherUser.id === self.id){
        throw new Error("You cannot follow yourself");
    }
    const following = await db.follow.findFirst({
       where: {
              followerId: self.id,
              followingId: otherUser.id
       }
    });

    if(following){
        throw new Error("You are already following this user");
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id
        },
        include:{
            following: true,
            follower: true
        }
    });

    return follow;
};

export const unfollowUser = async (id: string) => {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
        where: {id}
    });
    if(!otherUser){
        throw new Error("User not found");
    }
    if(otherUser.id === self.id){
        throw new Error("You cannot unfollow yourself");
    }
    const following = await db.follow.findFirst({
       where: {
              followerId: self.id,
              followingId: otherUser.id
       },
       include: {
        following: true,
        follower: true
    }
    });

    if(!following){
        throw new Error("You are not following this user");
    }

    await db.follow.delete({
        where: {
            id: following.id
        },
        
    });

    return following;
};
