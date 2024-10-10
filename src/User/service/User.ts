import AppError from "../../Error";
import UserRepositories from "../repositories/User";

export default class UserService{
    static async getAll(){
        const users = await UserRepositories.get();
        if(!users.length) throw new AppError('No users found', 404);
        return users
    }

    static async getById(id: string){
        const user = await UserRepositories.getById(id);
        if(!user) throw new AppError('No user found', 404);
        return user
    }
}