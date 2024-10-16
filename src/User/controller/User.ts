import { Request, Response } from "express";
import UserService from "../service/User";
import AppError from "../../Error";
import IUser from "../interface/IUser";
import { Types } from "mongoose";

export default class UserController{
    static async getAll(req: Request, res: Response): Promise<any>{
        const users = await UserService.getAll();
        return res.status(200).send(users);
    }

    static async getById(req: Request, res: Response): Promise<any>{
        const user = await UserService.getById(req.params.id);
        return res.status(200).send(user);
    }

    static async create(req: Request, res: Response): Promise<any>{
        const { name, phone, password } = req.body;

        let user: IUser | null;

        user = await UserService.getByName(name);

        if(user) throw new AppError('Nome já existente', 422);

        user = await UserService.createUser({ name, phone, password, createdAt: Date.now() });
        return res.status(201).send({ message: 'User criado com sucesso', user })
    }

    static async modify(req: Request, res: Response): Promise<any>{
        const { name, phone, password } = req.body;
        await UserService.modify({ name, phone, password }, req.params.id);
        return res.status(200).send({ message: "Usuário modificado com sucesso" });
    }

    static async delete(req: Request, res: Response): Promise<any>{
        await UserService.getById(req.params.id);
        await UserService.delete(req.params.id);
        return res.status(200).send('Usuário deletado com sucesso');
    }

    static async restore(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        
        const user = await UserService.getDeleted(new Types.ObjectId(id));
        const now = Date.now();

        await UserService.modify({
            name: user.name,
            phone: user.phone,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: now,
            deletedAt: null
        }, id);

        res.status(200).send({ message: "Usuário resetado com sucesso", user: {
            name: user.name,
            phone: user.phone
        }})
    }
}