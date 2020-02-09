import { groupModel } from './group.services';

export const addGroup = (req, res) => {
    const { name, permissions } = req.body;
    groupModel.createGroup({ name, permissions })
        .then(group => {
            if (group) {
                res.send(group);
            } else {
                res.status(404).send('Group with this name already exists!');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal problem!');
        });
}

export const getAllGroups = (req, res) => {
    groupModel.getAllGroups()
        .then(groups => {
            res.json(groups)
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal problem!');
        });
}

export const getGroup = (req, res) => {
    const { id } = req.params;
    groupModel.getGroupById(id)
        .then(group => {
            if (!group) {
                res.status(404).send('Group was not found!');
            } else {
                res.send(group);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal problem!');
        });
}

export const updateGroup = (req, res) => {
    const { id } = req.params;
    const { name, permissions } = req.body;
    groupModel.updateGroupById(id, { name, permissions })
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).send(`Group by id ${id} was not found!`);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal problem!');
        });
}

export const deleteGroup = (req, res) => {
    const { id } = req.params;
    groupModel.removeGroupById(id)
        .then(result => {
            if (result) {
                res.send(`Deleted group by id ${id}!`);
            } else {
                res.status(404).send(`Group by id ${id} was not found!`);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal problem!');
        });
}