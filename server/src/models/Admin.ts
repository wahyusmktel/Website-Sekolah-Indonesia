import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Admin extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public name!: string;
    public readonly created_at!: Date;
}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'admins',
        timestamps: false, // matches database.sql which has created_at but no updated_at
        underscored: true,
    }
);

export default Admin;
