import { NextFunction, Request, Response } from "express";
import AppError from "../../Error";

export default class UserMiddleware{
    static validateNameAndPassword(req: Request, _: Response, next: NextFunction){
        const { name, password } = req.body;
        
        if(!name) throw new AppError('Nome não fornecido', 400);
        if(name.length < 3) throw new AppError('Nome menor que 3 caracteres', 400);
        if(!password) throw new AppError('Senha não fornecida', 400);
        if(password.length < 6) throw new AppError('Senha menor que 6 caracteres', 400);

        next();
    }

    static async validatePhone(req: Request, _: Response, next: NextFunction){
        const { phone } = req.body;
        
        if(!phone) throw new AppError('Telefone não fornecido', 400);
        
        next()
    }
}