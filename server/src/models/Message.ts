import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Message extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public subject!: string;
    public message!: string;
    public is_read!: boolean;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'messages',
        timestamps: true,
        underscored: true,
    }
);

export default Message;
