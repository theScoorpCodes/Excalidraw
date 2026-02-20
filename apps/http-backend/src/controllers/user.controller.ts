import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  CreateUserSchema,
  SignInSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prisma } from "@repo/db";
import { createUserService } from "../services/user.service";
export const userSignUpController = async (req: Request, res: Response) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    return res.json({
      message: "Incorrect Inputs",
    });
  }
  try {
    createUserService(data.data);
    res.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating user",
      success: false
    });
  }
};

export const userSignInController = (req: Request, res: Response) => {
  const data = SignInSchema.safeParse(req.body);
  if (!data.success) {
    return res.json({
      message: "Incorrect Inputs",
    });
  }
  const userId = prisma.user.findFirst({
    where: {
      username: data.data.username,
      password: data.data.password,
    },
  });
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({ token });
};

export const userCreateRoomController = (req: Request, res: Response) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    return res.json({
      message: "Incorrect Inputs",
    });
  }
};
