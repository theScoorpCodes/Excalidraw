import { Request, Response } from "express";
import { createUserService, userSignInService } from "../services/user.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  CreateUserSchema,
  SignInSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { createRoomService } from "../services/room.service";

export const userSignUpController = async (req: Request, res: Response) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    return res.json({
      message: "Incorrect Inputs",
    });
  }
  try {
    const user = await createUserService(data.data);
    res.json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const userSignInController = async (req: Request, res: Response) => {
  const data = SignInSchema.safeParse(req.body);
  if (!data.success) {
    return res.json({
      message: "Incorrect Inputs",
    });
  }
  try {
    const user = await userSignInService(data.data);
    if (!user) {
      return res.json({
        message: "User not found",
        success: false,
      });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    return res.json({
      message: "User not found",
      success: false,
    });
  }
};

export const userCreateRoomController = async (req: Request, res: Response) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    return res.json({
      message: "Incorrect Inputs",
    });
  }

  const userId = (req as JwtPayload).userId;

  if (!userId) {
    return res.json({
      message: "User not found",
      success: false,
    });
  }

  console.log("user id is ", userId, "data is ", data)

  try {
    const room = await createRoomService({
      adminId: userId,
      slug: data.data.name
    });

    return res.json({
      roomId: room.id,
      success: true,
    });
  } catch (error: any) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};
