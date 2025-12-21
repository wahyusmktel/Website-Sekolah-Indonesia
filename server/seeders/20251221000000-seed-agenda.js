'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('agenda', [
            {
                title: "Ujian Tengah Semester Genap",
                date: "2024-03-11",
                end_date: "2024-03-15",
                location: "Ruang Kelas",
                description: "Pelaksanaan UTS semester genap untuk semua kelas",
            },
            {
                title: "Career Day 2024",
                date: "2024-03-20",
                end_date: "2024-03-20",
                location: "Aula Sekolah",
                description: "Pameran karir dengan 30+ perusahaan partner",
            },
            {
                title: "Praktik Kerja Lapangan",
                date: "2024-04-01",
                end_date: "2024-06-30",
                location: "Perusahaan Mitra",
                description: "PKL untuk siswa kelas XI di perusahaan mitra",
            },
            {
                title: "Wisuda Angkatan 2024",
                date: "2024-05-25",
                end_date: "2024-05-25",
                location: "Gedung Serbaguna",
                description: "Acara pelepasan siswa kelas XII",
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('agenda', null, {});
    }
};
