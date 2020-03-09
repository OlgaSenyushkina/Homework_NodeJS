import * as express from 'express';
import { checkCredentials } from './auth.controller';

export const authRouter = express.Router();

authRouter
    .post('/', checkCredentials);
