"use client";

import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

export const Actions = ({isFollowing, userId}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();
    
    const onClick = async () => {
        startTransition(() => {
            onFollow(userId)
            .then((data) => {
                toast.success(`You are now following ${data.following.username}!`);
            }).catch((error) => {
                toast.error(error.message);
            });

        });
    };
    
    return (
        <Button disabled={isPending || isFollowing} onClick={onClick}  variant="primary">Follow</Button>
    );
}