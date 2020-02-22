import { UserModelDB } from './user/user.model';
import { GroupModelDB } from './group/group.model';
import { UserGroupModelDB } from './userGroup/userGroup.model';

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
