import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Album extends Model {
    public id!: number;
    public slug!: string;
    public title!: string;
    public cover_image!: string;
    public category!: string;
    public date!: string;
    public description!: string;
    public readonly created_at!: Date;
}

Album.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        slug: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        cover_image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'album',
        timestamps: false,
        underscored: true,
    }
);

export default Album;
