"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    isBlocked: boolean;
    userId: string;
}

export const Actions = ({ isFollowing, isBlocked, userId }: ActionsProps) => {
    const [isPending, startTransition] = useTransition();


    const followUser = async (userId: string) => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => {
                    toast.success(`You are now following ${data.following.username}!`);
                }).catch((error) => {
                    toast.error(error.message);
                });

        });
    };

    const unfollowUser = async (userId: string) => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => {
                    toast.success(`You have unfollowed ${data.following.username}!`);
                }).catch((error) => {
                    toast.error(error.message);
                });

        });
    };

    const onClick = async () => {
        if (isFollowing) {
            await unfollowUser(userId);
        } else {
            await followUser(userId);
        }
    };

    const blockUser = async (userId: string) => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => {
                    toast.success(`You have blocked ${data.blocked.username}!`);
                }).catch((error) => {
                    toast.error(error.message);
                });

        });
    };

    const unblockUser = async (userId: string) => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => {
                    toast.success(`You have unblocked ${data.blocked.username}!`);
                }).catch((error) => {
                    toast.error(error.message);
                });
        });
    };

    const handleBlock = async () => {
        if(isBlocked){
            unblockUser(userId);
        }else{
            blockUser(userId);
        }
    };


    return (
        <>
            <Button disabled={isPending} onClick={onClick} variant="primary">
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button  onClick={handleBlock}>
            {isBlocked ? "Unblock" : "Block"}
            </Button>
        </>
    );
}