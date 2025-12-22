import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class IndustryStat extends Model {
    public id!: number;
    public label!: string;
    public value!: string;
    public order_priority!: number;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

IndustryStat.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        label: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        order_priority: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'industry_stats',
        timestamps: true,
        underscored: true,
    }
);

export default IndustryStat;
