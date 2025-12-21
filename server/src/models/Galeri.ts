import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Galeri extends Model {
    public id!: number;
    public title!: string;
    public category!: string;
    public image!: string;
    public album_id!: number | null;
    public readonly created_at!: Date;
}

Galeri.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        album_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'album',
                key: 'id',
            },
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'galeri',
        timestamps: false,
        underscored: true,
    }
);

export default Galeri;
