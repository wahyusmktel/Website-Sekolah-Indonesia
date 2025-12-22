import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Prestasi extends Model {
    public id!: number;
    public title!: string;
    public slug!: string;
    public category!: string;
    public winner!: string;
    public date!: string;
    public level!: string;
    public image!: string;
    public description!: string;
    public long_description!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Prestasi.init(
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
        slug: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        category: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        winner: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        level: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        long_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'prestasi',
        timestamps: true,
        underscored: true,
    }
);

export default Prestasi;
