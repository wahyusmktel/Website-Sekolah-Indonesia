'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('statistik', [
            { label: "Siswa Aktif", value: 1250, icon: "Users", suffix: "+" },
            { label: "Guru & Staff", value: 85, icon: "GraduationCap", suffix: "" },
            { label: "Program Keahlian", value: 6, icon: "Building", suffix: "" },
            { label: "Prestasi", value: 200, icon: "Trophy", suffix: "+" },
            { label: "Mitra Industri", value: 50, icon: "Briefcase", suffix: "+" },
            { label: "Alumni Sukses", value: 5000, icon: "Award", suffix: "+" },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('statistik', null, {});
    }
};
