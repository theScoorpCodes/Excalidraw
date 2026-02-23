import { prisma } from "@repo/db/client";

export const createRoomService = async (roomData: any) => {
    try {
        console.log("room data is",roomData)
        const room = await prisma.room.create({
            data: {
                slug: roomData.slug,
                adminId: roomData.adminId
            },
        });
        return room;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
};