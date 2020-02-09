import * as express from 'express';
import { validator } from '../helpers';
import { groupModel } from './group.services';
import { 
    getAllGroups,
    getGroup,
    addGroup,
    updateGroup,
    deleteGroup,
} from './group.controller';

export const groupRouter = express.Router();

groupRouter.route('/')
    .get(getAllGroups)
    .post(validator.body(groupModel.getSchema()), addGroup);

groupRouter.route('/:id')
    .get(getGroup)
    .put(validator.body(groupModel.getSchema()), updateGroup)
    .delete(deleteGroup);