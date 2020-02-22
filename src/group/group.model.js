import { sequelize } from '../db';
import { Model, UUID, STRING, ARRAY, ENUM } from 'sequelize';

export class GroupModelDB extends Model {}

GroupModelDB.init({
    id: { 
        type: UUID,
        primaryKey: true,
        allowNull: false,
        unique: true 
    },
    name: { 
        type: STRING, 
        allowNull: false, 
        unique: true 
    },
    permissions: { 
        type: ARRAY(ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'group',
    timestamps: false
})