import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class ProgramKeahlian extends Model {
    public id!: number;
    public name!: string;
    public slug!: string;
    public short_desc!: string;
    public description!: string;
    public image!: string;
    public icon!: string;
    public prospects!: string[];
}

ProgramKeahlian.init(
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
        slug: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        short_desc: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        icon: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        prospects: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'program_keahlian',
        timestamps: false,
        underscored: true,
    }
);

export default ProgramKeahlian;
