import { userModel } from './user.services';

export const getUsers = (req, res) => {
    const { login, limit } = req.query;
    userModel.getUsers({ login, limit })
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal problem!');
        });
}

export const getUser = (req, res) => {
    const { id } = req.params;
    userModel.getUserById(id)
        .then(user => {
            if (!user) {
                res.status(404).send('User was not found!');
            } else {
                res.send(user);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal problem!');
        });
}

export const addUser = (req, res) => {
    const { age, login, password } = req.body;
    userModel.addNewUser({ age, login, password })
        .then(user => {
            if (user) {
                res.send(user);
            } else {
                res.status(404).send('User with this login already exists!');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal problem!');
        });
}

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { login, password, age } = req.body;
    userModel.updateUserById(id, { login, password, age })
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).send(`User by id ${id} was not found!`);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal problem!');
        });
}

export const deleteUser = (req, res) => {
    const { id } = req.params;
    userModel.deleteUserById(id)
        .then(result => {
            if (result) {
                res.send(`Deleted user by id ${id}!`);
            } else {
                res.status(404).send(`User by id ${id} was not found!`);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal problem!');
        });
}