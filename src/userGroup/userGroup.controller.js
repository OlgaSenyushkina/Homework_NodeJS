import { userGroupModel } from './userGroup.services';

export const getAll = (req, res) => {
    userGroupModel.getAll()
        .then(userGroups => {
            res.json(userGroups)
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal problem!');
        });
}

export const getUserGroup = (req, res) => {
    const { id } = req.params;
    userGroupModel.getUserGroup(id)
        .then(user => {
            if (!user) {
                res.status(404).send('Users group was not found!');
            } else {
                res.send(user);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal problem!');
        });
}

export const addUsersToGroup = (req, res) => {
    const { groupId, users } = req.body;
    userGroupModel.addUsersToGroup({ groupId, users })
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).send(`Users group by id ${groupId} was not found!`);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal problem!');
        });
}