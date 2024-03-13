import { getSelf } from "./auth-service";
import { db } from "./db";

export const isBlockedUser = async (id: string) =>{
    try{
        const self = await getSelf();
        const otherUser = await db.user.findUnique({
            where: { id }
        });
        if(!otherUser){
            throw new Error("User not found");
        }
        if(otherUser.id === self.id){
            return false;
        };
        const existingBlock = await db.block.findUnique({
            where: {
                unique_block: {
                    blockedId: otherUser.id,
                    blockerId: self.id
                }
            }
        });

        return !!existingBlock;

    }catch(error){
        console.error(error);
        return false;
    };
};

export const blockUser = async (id: string) =>{
        const self = await getSelf();
        if(self.id === id){
            throw new Error("You cannot block yourself");
        };

        const otherUser = await db.user.findUnique({
            where: { id }
        });
        if(!otherUser){
            throw new Error("User not found");
        };

        const existingBlock = await db.block.findUnique({
            where: {
                unique_block: {
                    blockedId: otherUser.id,
                    blockerId: self.id
                }
            }
        });
        if(existingBlock){
            throw new Error("User already blocked");
        }

        const block = await db.block.create({
            data: {
                blockerId: self.id,
                blockedId: otherUser.id
            },
            include: {
                blocked: true
            }
        });

        return block;
    

}

export const ublockUser = async (id: string) =>{
    const self = await getSelf();
    if(self.id === id){
        throw new Error("You cannot unblock yourself");
    };

    const otherUser = await db.user.findUnique({
        where: { id }
    });
    if(!otherUser){
        throw new Error("User not found");
    };

    const existingBlock = await db.block.findUnique({
        where: {
            unique_block: {
                blockedId: otherUser.id,
                blockerId: self.id
            }
        }
    });
    if(!existingBlock){
        throw new Error("User not blocked");
    }

    const block = await db.block.delete({
        where: {
            id: existingBlock.id
        },
        include: {
            blocked: true
        }
    });

    return block;
};

