import * as express from 'express';
import { validator } from '../helpers';
import { userGroupModel } from './userGroup.services';
import { 
    getAll,
    getUserGroup,
    addUsersToGroup,
} from './userGroup.controller';

export const userGroupRouter = express.Router();

userGroupRouter
    .get('/', getAll)
    .get('/:id', getUserGroup);
    
userGroupRouter
    .use(validator.body(userGroupModel.getSchema()))
    .post('/', addUsersToGroup);