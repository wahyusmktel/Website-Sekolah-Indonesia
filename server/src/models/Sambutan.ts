import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Sambutan extends Model {
    public id!: number;
    public principal_name!: string;
    public principal_role!: string;
    public principal_image!: string;
    public title!: string;
    public greeting!: string;
    public content!: string;
    public quote_footer!: string;
}

Sambutan.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        principal_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        principal_role: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        principal_image: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        greeting: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        quote_footer: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'sambutan',
        timestamps: false,
        underscored: true,
    }
);

export default Sambutan;
