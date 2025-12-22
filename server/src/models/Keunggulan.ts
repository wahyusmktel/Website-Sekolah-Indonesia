import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Keunggulan extends Model {
    public id!: number;
    public icon!: string;
    public title!: string;
    public description!: string;
}

Keunggulan.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        icon: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'keunggulan',
        timestamps: false,
        underscored: true,
    }
);

export default Keunggulan;
