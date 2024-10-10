import 'express-async-errors';
import express from "express";
import userRouter from './routes';
import connectDb from "./startup/db";
import handleError from '../middleware/errorHandle';
import cors from 'cors';

connectDb();

const app = express();
const PORT = 4001;

app .use(cors())
    .use(express.json())
    .use('/api/users', userRouter)
    .use(handleError as any)

app.listen(PORT, () => console.log(`Serviço User rodando na porta ${PORT}`))