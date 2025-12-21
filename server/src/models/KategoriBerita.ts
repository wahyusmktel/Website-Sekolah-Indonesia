import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class KategoriBerita extends Model {
    public id!: number;
    public name!: string;
    public readonly created_at!: Date;
}

KategoriBerita.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'kategori_berita',
        timestamps: false,
        underscored: true,
    }
);

export default KategoriBerita;
