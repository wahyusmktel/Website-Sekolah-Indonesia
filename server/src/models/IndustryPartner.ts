import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class IndustryPartner extends Model {
    public id!: number;
    public name!: string;
    public logo!: string;
    public category!: string;
    public order_priority!: number;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

IndustryPartner.init(
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
        logo: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        order_priority: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'industry_partners',
        timestamps: true,
        underscored: true,
    }
);

export default IndustryPartner;
