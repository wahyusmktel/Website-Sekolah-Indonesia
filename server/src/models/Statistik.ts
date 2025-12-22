import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Statistik extends Model {
    public id!: number;
    public label!: string;
    public value!: number;
    public icon!: string;
    public suffix!: string;
}

Statistik.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        label: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        icon: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        suffix: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: '',
        },
    },
    {
        sequelize,
        tableName: 'statistik',
        timestamps: false,
        underscored: true,
    }
);

export default Statistik;
