import AppError from "../../Error";
import IUser from "../interface/IUser";
import UserRepositories from "../repositories/User";

export default class UserService{
    static async getAll(){
        const users = await UserRepositories.get();
        if(!users.length) 
            throw new AppError('Nenhum usuário encontrado', 404);

        return users
    }

    static async getById(id: string){
        return await UserRepositories.getById(id);
    }

    static async getByName(name: string): Promise<IUser>{ 
        return await UserRepositories.getByName(name);
    }

    static async createUser(payload: IUser): Promise<IUser>{
        return await UserRepositories.create(payload);
    }

    static async modify(payload: IUser, id: string){
        await UserRepositories.getById(id);
        return await UserRepositories.modifyUserById(payload, id);
    }

    static async delete(id: string){
        const user = await UserRepositories.getById(id);
        await UserRepositories.modifyUserById({ 
            name: user.name, 
            phone: user.phone, 
            password: user.password, 
            createdAt: user.createdAt,
            updatedAt: Date.now(),
            deletedAt: Date.now() }, id)
    }
}