export { userModel } from './user.services';
export { sequelize } from './user.model';
export { 
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
} from './user.controller';