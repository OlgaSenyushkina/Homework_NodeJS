const validator = require('express-joi-validation').createValidator({});
const users = require('./users.json');
const uuid = require('uuid/v4');
const express = require('express');
const { querySchema } = require('./querySchema');

const app = express();
const port = 3000;
const userRouter = express.Router();
const router = express.Router();


userRouter
    .get('/', (req, res) => {
        const { login, limit = 3 } = req.query;
        const data = login ? users.filter(user => user.login.includes(login)).slice(0, limit) : users;

        res.json(data);
    })
    .get('/:id', (req, res) => {
        const { id } = req.params;
        const user = users.find(user => user.id === id && !user.isDeleted);
        
        user ? res.send(user) : res.status(404).send('User is not found!');
    })
    .post('/', validator.query(querySchema), (req, res) => {
        const { age, isDeleted, login, password } = req.query;
        
        users.push({
            login,
            password,
            isDeleted,
            id: uuid(),
            age: Number(age),
        });

        res.send(users);
    })
    .put('/:id', validator.query(querySchema), (req, res) => {
        const { id } = req.params;
        const { login, password, age, isDeleted } = req.query;

        users = users.map(user => (
            user.id === id ? {
                id,
                login: login || user.login,
                password: password || user.password,
                age: Number(age) || user.age,
                isDeleted,
            } : user
        ));
    
        res.send(users);
    })
    .delete('/:id', (req, res) => {
        const { id } = req.params;
        const isHasUser = users.some(user => (user.id === id && !user.isDeleted));

        if (isHasUser) {
            users.forEach(user => {
                if (user.id === id) {
                    user.isDeleted = true;
                }
            });

            res.send(`Deleted user by id ${id}!`);
        } else {
            res.status(404).send(`User by id ${id} is not found!`);
        }
    });

router
    .use('/users', userRouter)
    .use('/', (req, res) => {
        res.send(users);
    });

app
    .use(router)
    .listen(port, () => console.log(`Example app listening on port ${port}!`));