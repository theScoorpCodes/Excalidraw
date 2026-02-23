import {prisma} from "@repo/db/client"
export const createUserService = async (userData: any) => {
    try {
        const user = await prisma.user.create({
            data: userData
        })
        console.log(user)
        return user;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
};

export const userSignInService = async (userData: any) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: userData.email,
                password: userData.password
            }
        });
        return user
    } catch (error) {
        throw error
    }
};

