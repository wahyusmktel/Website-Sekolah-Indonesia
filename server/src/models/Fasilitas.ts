import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Fasilitas extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public features!: string[];
    public image!: string;
    public icon!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Fasilitas.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        features: {
            type: DataTypes.JSON,
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
    },
    {
        sequelize,
        tableName: 'fasilitas',
        timestamps: true,
        underscored: true,
    }
);

export default Fasilitas;
