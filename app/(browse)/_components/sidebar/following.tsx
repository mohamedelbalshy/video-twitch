"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

interface FollowingProps {
    data: (Follow & { following: User })[];
};


export const Following = ({ data }: FollowingProps) => {

    const { collapsed } = useSidebar((state) => state);
    const showLabel = !collapsed && data.length > 0;

    return (
        <div>
            {showLabel && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">Following</p>
                </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map((following) => (
                    <UserItem
                        key={following.following.id}
                        username={following.following.username}
                        imageUrl={following.following.imageUrl}
                        isLive={true}
                    />
                ))}
            </ul>
        </div>
    );
};


export const FollowingSkeleton = () => {
    return (
        <ul className="px-2">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
};

