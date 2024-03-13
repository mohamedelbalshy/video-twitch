import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedUser } from "@/lib/block-service";

interface UserPageProps {
    params:{
        username: string;
    }
};

export default async function UserPage({params}: UserPageProps) {
    const user = await getUserByUsername(params.username);
    if(!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);

    const isBlocked = await isBlockedUser(user.id);
    
    return (
        <div className="flex flex-col gap-y-4 p-5">
            <p>Username:{user.username}</p>
            <p>ID: {user.id}</p>
            <p>IsFollowing: {`${isFollowing}`}</p>
            <Actions isBlocked={isBlocked} isFollowing={isFollowing} userId={user.id} />
        </div>
    );

};