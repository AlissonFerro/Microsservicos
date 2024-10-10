import { Request, Response } from "express";
import { UserModel } from "../model/User";
import UserService from "../service/User";

export default class UserController{
    static async getAll(req: Request, res: Response): Promise<any>{
        const users = await UserService.getAll();
        return res.status(200).send(users);
    }

    static async getById(req: Request, res: Response): Promise<any>{
        const user = await UserService.getById(req.params.id);
        return res.status(200).send(user);
    }

    
}