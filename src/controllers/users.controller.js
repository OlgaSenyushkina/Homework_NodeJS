import users from '../helpers/users.json';
import uuid from 'uuid/v4';

export const getUsersByLogin = (req, res) => {
    const { login, limit = 5 } = req.query;
    
    const prepareUsers = users.filter(user => !user.isDeleted);
    
    if (login) {
        const data = prepareUsers
            .filter(user => user.login.includes(login))
            .slice(0, limit)
            .sort((a, b) => {
                const loginA = a.login.toLowerCase();
                const loginB = b.login.toLowerCase();

                return (loginA < loginB) ? -1 : (loginA > loginB) ? 1 : 0;
            });

        res.json(data);
    } else {
        res.json(prepareUsers);
    }
    
}

export const getUserById = (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === id && !user.isDeleted);
    
    user ? res.send(user) : res.status(404).send('User is not found!');
}

export const addNewUser = (req, res) => {
    const { age, login, password } = req.query;
    
    users.push({
        login,
        password,
        age: Number(age),
        isDeleted: false,
        id: uuid(),
    });

    res.send(users);
}

export const updateUserById = (req, res) => {
    const { id } = req.params;
    const { login, password, age } = req.query;
    const user = users.find(item => item.id === id);

    if (user) {
        user.login = login,
        user.password = password,
        user.age = Number(age),

        res.send(user);
    } else {
        res.status(404).send(`User by id ${id} is not found!`);
    }
}

export const deleteUserById = (req, res) => {
    const { id } = req.params;
    const user = users.find(item => (item.id === id && !item.isDeleted));

    if (user) {
        user.isDeleted = true;

        res.send(`Deleted user by id ${id}!`);
    } else {
        res.status(404).send(`User by id ${id} is not found!`);
    }
}