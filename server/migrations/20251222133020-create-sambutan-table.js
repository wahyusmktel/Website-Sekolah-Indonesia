'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('sambutan', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            principal_name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            principal_role: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            principal_image: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            title: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            greeting: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            quote_footer: {
                type: Sequelize.STRING(255),
                allowNull: true
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('sambutan');
    }
};
