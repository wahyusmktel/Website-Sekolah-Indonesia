import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class ContactInfo extends Model {
    public id!: number;
    public school_name!: string;
    public address!: string;
    public phone!: string;
    public email!: string;
    public website!: string;
    public maps_url!: string;
    public facebook_url!: string;
    public instagram_url!: string;
    public youtube_url!: string;
    public twitter_url!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

ContactInfo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        school_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        website: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        maps_url: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        facebook_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        instagram_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        youtube_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        twitter_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'contact_info',
        timestamps: true,
        underscored: true,
    }
);

export default ContactInfo;
