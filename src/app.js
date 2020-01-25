import { PORT } from './helpers/const';
import { homeRouter } from './routes/home';
import { userRouter } from './routes/user';
import { sequelize } from "./services";
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
    .listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}!`);
        sequelize
            .authenticate()
            .then(() => {
                console.log('[sequelize] Our database is working correctly!');
            })
            .catch(err => {
                console.error('[sequelize] Unable to connect to the database:', err);
            });
    });