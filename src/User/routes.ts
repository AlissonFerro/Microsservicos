import { Router } from 'express';
import UserController from './controller/User';
import UserMiddleware from './middleware/user';
const userRouter = Router();

userRouter
    .get('/', UserController.getAll)
    .get('/:id', UserController.getById)

    .post('/', 
        UserMiddleware.validateNameAndPassword, 
        UserMiddleware.validatePhone,
        UserController.create)

    .patch('/:id',
        UserMiddleware.validateNameAndPassword,
        UserMiddleware.validatePhone,
        UserController.modify)
    
    .delete('/:id', 
        UserController.delete
    )
    
export default userRouter