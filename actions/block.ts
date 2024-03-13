"use server";

import { blockUser, ublockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    const blockedUser = await blockUser(id);
    revalidatePath("/");
    if (blockedUser) {
        revalidatePath(`/${blockedUser.blocked.username}`);
    }
    return blockedUser;
};

export const onUnblock = async (id: string) => {
    const unblockedUser = await ublockUser(id);
    revalidatePath("/");
    if (unblockedUser) {
        revalidatePath(`/${unblockedUser.blocked.username}`);
    }
    return unblockedUser;
};