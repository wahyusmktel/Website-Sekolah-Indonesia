'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('site_settings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            school_name: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'SMK Indonesia'
            },
            school_logo: {
                type: Sequelize.STRING,
                allowNull: true
            },
            seo_keywords: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            seo_description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        });

        // Insert initial record
        await queryInterface.bulkInsert('site_settings', [{
            school_name: 'SMK Indonesia',
            school_logo: '/logo.png',
            seo_keywords: 'smk, sekolah, indonesia, pendidikan, vokasi',
            seo_description: 'Website resmi SMK Indonesia untuk informasi pendaftaran, kegiatan sekolah, dan prestasi siswa.',
            created_at: new Date(),
            updated_at: new Date()
        }]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('site_settings');
    }
};
