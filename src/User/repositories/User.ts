import { UserModel } from "../model/User";

export default class UserRepositories{
    static async get(){
        return await UserModel.find();
    }

    static async getById(id: string){
        return await UserModel.findById(id);
    }
}