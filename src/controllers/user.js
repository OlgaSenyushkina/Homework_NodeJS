import { userModel } from "../models/user";

export const getUsers = (req, res) => {
    const { login, limit } = req.query;
    const users = userModel.getUsers({ login, limit });

    res.json(users);
}

export const getUser = (req, res) => {
    const { id } = req.params;
    const user = userModel.getUserById(id);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send('User was not found!');
    }
}

export const addUser = (req, res) => {
    const { age, login, password } = req.body;
    const user = userModel.addNewUser({ age, login, password });

    if (user) {
        res.send(user);
    } else {
        res.status(404).send('User with this login already exists!');
    }
}

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { login, password, age } = req.body;
    const result = userModel.updateUserById(id, { login, password, age });

    if (result) {
        res.send(result);
    } else {
        res.status(404).send(`User by id ${id} was not found!`);
    }
}

export const deleteUser = (req, res) => {
    const { id } = req.params;
    const result = userModel.deleteUserById(id);

    if (result) {
        res.send(`Deleted user by id ${id}!`);
    } else {
        res.status(404).send(`User by id ${id} was not found!`);
    }
}