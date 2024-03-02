"use server";

import { followUser, unfollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
  const followedUser = await followUser(id);
  revalidatePath("/");
  if (followedUser) {
    revalidatePath(`/${followedUser.following.username}`);
  }
  return followedUser;
};

export const onUnfollow = async (id: string) => {
    const unfollowedUser = await unfollowUser(id);
    revalidatePath("/");
    if (unfollowedUser) {
        revalidatePath(`/${unfollowedUser.following.username}`);
    }
    return unfollowedUser;
};
