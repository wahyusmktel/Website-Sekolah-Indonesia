import { Sequelize } from 'sequelize';
import sequelize from '../config/sequelize';

// Import models here
import Admin from './Admin';
import KategoriBerita from './KategoriBerita';
import Agenda from './Agenda';
import ProgramKeahlian from './ProgramKeahlian';
import Album from './Album';
import Galeri from './Galeri';

import Keunggulan from './Keunggulan';
import Sambutan from './Sambutan';
import Statistik from './Statistik';

// Associations
Album.hasMany(Galeri, { foreignKey: 'album_id', as: 'items' });
Galeri.belongsTo(Album, { foreignKey: 'album_id', as: 'album' });

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Admin = Admin;
db.KategoriBerita = KategoriBerita;
db.Agenda = Agenda;
db.ProgramKeahlian = ProgramKeahlian;
db.Album = Album;
db.Galeri = Galeri;
db.Keunggulan = Keunggulan;
db.Sambutan = Sambutan;
db.Statistik = Statistik;

export default db;
