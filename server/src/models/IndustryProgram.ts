import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class IndustryProgram extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public icon!: string;
    public order_priority!: number;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

IndustryProgram.init(
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
        icon: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        order_priority: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'industry_programs',
        timestamps: true,
        underscored: true,
    }
);

export default IndustryProgram;
