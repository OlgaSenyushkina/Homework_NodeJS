import * as express from 'express';

export const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    res.send('Welcome to my app!');
});