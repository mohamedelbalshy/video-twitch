import { cva, type VariantProps } from "class-variance-authority"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LiveBadge } from "@/components/live-badge";
import { Skeleton } from "./ui/skeleton";


const avatarSizes = cva("", {
    variants: {
        size: {
            default: "w-8 h-8",
            lg: "h-14 w-14",
            xl: "h-20 w-20"
        }
    },
    defaultVariants: {
        size: "default"
    }
});
interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    username: string;
    imageUrl: string;
    isLive?: boolean;
    showBadge?: boolean;
};
export const UserAvatar = ({ imageUrl, username, isLive, showBadge, size }: UserAvatarProps) => {
    const canShowBadge = showBadge && isLive;

    return (
        <div className="relative">
            <Avatar
                className={cn(
                    isLive && "ring-2 ring-rose-500 border border-background",
                    avatarSizes({ size }))
                }

            >
                <AvatarImage src={imageUrl} alt={username} className="object-cover" />
                <AvatarFallback >
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
            {canShowBadge && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <LiveBadge />
                </div>
            )}
        </div>
    );
};
interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> { };

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
    return (
        <Skeleton className={cn(
            "rounded-full",
            avatarSizes({ size }))}
        />
    );
};