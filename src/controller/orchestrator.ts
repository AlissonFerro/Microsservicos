import { Request, Response } from "express";
import axios from "axios";

export default class OrchestratorController{
    public static async getUsers(req: Request, res: Response): Promise<void>{
        const service = await axios.get('http://localhost:4001/api/users');
        res.json(service);    
    }
}