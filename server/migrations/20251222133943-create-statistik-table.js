'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('statistik', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            label: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            value: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            icon: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            suffix: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: ''
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('statistik');
    }
};
