'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('admins', [
            {
                username: 'wahyurah55',
                password: '$2b$10$q5Qbk7PDt9hKrSzUI49kneP5uyo.a9cEkgfiMjpCnfc71NexepTP',
                name: 'Wahyu Rahmadhani',
                role: 'superadmin',
                created_at: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('admins', { username: 'wahyurah55' }, {});
    }
};
