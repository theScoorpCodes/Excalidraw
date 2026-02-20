import { prisma } from "@repo/db";
export const createUserService = (userData: any) => {
  try {
    const user = prisma.user.create({
      data: userData,
    });

  } catch (err) {
    throw new Error("error creating user");
  }
};

export const userLoginService = () => {};
