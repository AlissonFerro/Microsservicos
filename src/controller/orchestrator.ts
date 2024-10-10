import { Request, Response } from "express";
import axios from "axios";

export default class OrchestratorController{
    public static async getUsers(req: Request, res: Response): Promise<void>{
        try {
            const service = await axios.get('http://localhost:4001/api/users');
            console.log(service);
            res.json(service);
        } catch (error) {
            console.log(error);
        }       
    }
}