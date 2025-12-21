import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Agenda extends Model {
    public id!: number;
    public title!: string;
    public date!: string;
    public end_date!: string;
    public location!: string;
    public description!: string;
}

Agenda.init(
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
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'agenda',
        timestamps: false,
        underscored: true,
    }
);

export default Agenda;
