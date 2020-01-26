import * as express from 'express';
import { validator } from '../../helpers';
import { 
    userModel,
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
} from '../../user';

export const userRouter = express.Router();

userRouter.route('/')
    .get(getUsers)
    .post(validator.body(userModel.getSchema()), addUser);

userRouter.route('/:id')
    .get(getUser)
    .put(validator.body(userModel.getSchema()), updateUser)
    .delete(deleteUser);