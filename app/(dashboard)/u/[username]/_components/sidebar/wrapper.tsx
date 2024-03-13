"use client";
import { useIsClient } from "usehooks-ts"

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-seidebar";
import { Skeleton } from "@/components/ui/skeleton";

interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {

    const isClient = useIsClient();
    const { collapsed } = useCreatorSidebar((state) => state);

    if (!isClient) {
        return <WrapperSkeleton />;
    }
    return (
        <aside className={cn("fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50",
            collapsed && "w-[70px] lg:w-[70px]"
        )}>
            {children}
        </aside>
    )
}

export const WrapperSkeleton = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <div className="flex items-center justify-between px-3 py-5">
                <Skeleton className="h-12 w-20 rounded-md " />
                <Skeleton className="h-12 w-12 rounded-md " />
            </div>
        </aside>
    )
};

