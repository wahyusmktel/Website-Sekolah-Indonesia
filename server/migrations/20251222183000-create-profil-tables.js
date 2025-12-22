'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('profil_sekolah', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            hero_title: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            hero_subtitle: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            hero_description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            visi_title: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            visi_content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            misi_title: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });

        await queryInterface.createTable('misi_items', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        });

        await queryInterface.createTable('sejarah', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            year: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            title: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('profil_sekolah');
        await queryInterface.dropTable('misi_items');
        await queryInterface.dropTable('sejarah');
    }
};
