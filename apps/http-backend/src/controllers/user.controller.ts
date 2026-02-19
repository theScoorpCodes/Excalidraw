import { Request, Response } from "express";
import { createUserService, userLoginService } from "../services/user.service";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SignInSchema, CreateRoomSchema} from "@repo/common/types";

export const userSignUpController = (req: Request, res: Response) => {
        const data = CreateUserSchema.safeParse(req.body);
        if(!data.success){
            return res.json({
                message: "Incorrect Inputs"
        })
        }
}

export const userSignInController = (req: Request, res: Response) => {

    const data = SignInSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Incorrect Inputs"
        })
    }
    const userId = 1;
    const token = jwt.sign({ userId }, JWT_SECRET); 
    res.json({ token });
}

export const userCreateRoomController = (req: Request, res: Response) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Incorrect Inputs"
        })
    }
}
