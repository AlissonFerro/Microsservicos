import { Router } from 'express';
import UserController from './controller/User';
const userRouter = Router();

userRouter
    .get('/', UserController.getAll)
    .get('/:id', UserController.getById)

export default userRouter