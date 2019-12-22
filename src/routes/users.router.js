import * as express from 'express';
import { validator } from '../helpers/const';
import { userSchema } from '../models/user';
import { 
    getUsers,
    getUserById,
    addNewUser,
    updateUserById,
    deleteUserById,
} from '../controllers/usersController';

export const userRouter = express.Router();

userRouter
    .get('/', getUsers)
    .get('/:id', getUserById)
    .post('/create', validator.body(userSchema), addNewUser)
    .put('/:id/update', validator.body(userSchema), updateUserById)
    .delete('/:id/delete', deleteUserById);