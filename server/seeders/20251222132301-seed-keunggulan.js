'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('keunggulan', [
            {
                icon: "GraduationCap",
                title: "Kurikulum Industri",
                description: "Kurikulum yang disesuaikan dengan kebutuhan industri terkini",
            },
            {
                icon: "Users",
                title: "Guru Profesional",
                description: "Tenaga pengajar bersertifikat dan berpengalaman di bidangnya",
            },
            {
                icon: "Building",
                title: "Fasilitas Lengkap",
                description: "Lab komputer, workshop, dan ruang praktik standar industri",
            },
            {
                icon: "Briefcase",
                title: "Kerja Sama Industri",
                description: "Bermitra dengan 50+ perusahaan untuk magang dan penempatan kerja",
            },
            {
                icon: "Award",
                title: "Prestasi Gemilang",
                description: "Ratusan prestasi di tingkat regional, nasional, dan internasional",
            },
            {
                icon: "Heart",
                title: "Pendidikan Karakter",
                description: "Pembentukan karakter dan soft skill untuk kesuksesan masa depan",
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('keunggulan', null, {});
    }
};
