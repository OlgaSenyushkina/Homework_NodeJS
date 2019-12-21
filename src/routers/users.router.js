import * as express from 'express';
import { validator } from '../helpers/const';
import { querySchema } from '../helpers/schema';
import { 
    getUsersByLogin,
    getUserById,
    addNewUser,
    updateUserById,
    deleteUserById,
} from '../controllers/users.controller';

export const userRouter = express.Router();

userRouter
    .get('/', getUsersByLogin)
    .get('/:id', getUserById)
    .post('/', validator.query(querySchema), addNewUser)
    .put('/:id', validator.query(querySchema), updateUserById)
    .delete('/:id', deleteUserById);