import { NextFunction, Request, Response } from "express";
import AppError from "../Error";

export default function handleError(err: Error, _: Request, res: Response, next: NextFunction) {
    let status = 500;
 
    const message = err.message || 'Internal Server Error';
 
    if (err instanceof AppError) {
        status = err.statusCode || 500;
    }
     
    return res.status(status).json({message});
}