import { getRecommended } from "@/lib/recommended-service";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle, ToggleSkeleton } from "./toggle"
import { Wrapper } from "./wrapper"
import { getFollowings } from "@/lib/follow-service";
import { Following, FollowingSkeleton } from "./following";

export const Sidebar = async () => {
    const recommended = await getRecommended();
    const followings = await getFollowings();

    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt0">
                <Recommended data={recommended} />
                <Following data={followings}  />
            </div>
        </Wrapper>
    );
}

export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E25] z-50">
            <ToggleSkeleton />
            <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">Recommended</p>
                </div>
            <RecommendedSkeleton />
            <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">Following</p>
                </div>
            <FollowingSkeleton />
        </aside>
    );
};