import { PORT } from './helpers/const';
import { homeRouter } from './routes/home.router';
import { userRouter } from './routes/users.router';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app
    .use(bodyParser.json())
    .use('/users', userRouter)
    .use('/', homeRouter)
    .use((req, res) => {
        res.status(404).send('404 Not Found');
    })
    .listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));