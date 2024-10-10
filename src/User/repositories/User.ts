import AppError from "../../Error";
import IUser from "../interface/IUser";
import { UserModel } from "../model/User";

export default class UserRepositories{
    static async get():Promise<IUser[]>{
        return await UserModel.find({deletedAt: null});
    }

    static async getById(id: string): Promise<IUser>{
        const user = await UserModel.findOne({ _id: id, deletedAt: undefined });
        if(!user) 
            throw new AppError('Nenhum usuário encontrado', 404);
        return user
    }

    static async create(payload: IUser): Promise<IUser>{
        return await UserModel.create(payload);
    }

    static async getByName(name: string): Promise<IUser>{
        const user = await UserModel.findOne({ name })
        if(!user) 
            throw new AppError('Nenhum usuário encontrado', 404);
        
        return user;
    }

    static async modifyUserById(payload: IUser, id: string){
        return await UserModel.findByIdAndUpdate(id, { 
            name: payload.name, 
            phone: payload.phone, 
            password: payload.password, 
            updatedAt: payload.updatedAt,
            deletedAt: payload.deletedAt 
        });
    }
}