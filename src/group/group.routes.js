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

groupRouter
    .get('/', getAllGroups)
    .get('/:id', getGroup)
    .delete('/:id', deleteGroup);

groupRouter
    .use(validator.body(groupModel.getSchema()))
    .post('/', addGroup)
    .put('/:id', updateGroup);