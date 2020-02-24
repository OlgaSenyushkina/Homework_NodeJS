import { UserModelDB } from './user/user.model';
import { GroupModelDB } from './group/group.model';
import { UserGroupModelDB } from './userGroup/userGroup.model';

import { userModel } from './user/user.services';

Promise.all([
    UserModelDB.sync({force: true}),
    GroupModelDB.sync({force: true})
])
.then(() => {
    return UserGroupModelDB.sync({force: true});
})
.then(() => {

GroupModelDB.belongsToMany(UserModelDB, {
    through: 'userGroup',
    foreignKey: 'groupId',
    otherKey: 'userId',
    as: 'users',
  });

  UserModelDB.belongsToMany(GroupModelDB, {
    through: 'userGroup',
    foreignKey: 'userId',
    otherKey: 'groupId',
    as: 'groups',
  });
})
.then(() => Promise.all([
  userModel.addNewUser({
    login: 'test1',
    password: 'test1test1',
    age: 18,
    isDeleted: false
  }),
  userModel.addNewUser({
    login: 'test2',
    password: 'test2test2',
    age: 28,
    isDeleted: false
  }),
  userModel.addNewUser({
    login: 'test3',
    password: 'test3test3',
    age: 38,
    isDeleted: false
  })
]))
.then(data => {
  console.log('users created: ', data.map(elem => elem.dataValues));
})
