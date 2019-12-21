import { PORT } from './helpers/const';
import { userRouter } from './routers/users.router';
import express from 'express';

const app = express();
const router = express.Router();

router
    .use('/users', userRouter)
    .use('/', (req, res) => {
        res.send('Welcome to my app!');
    });

app
    .use(router)
    .listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));