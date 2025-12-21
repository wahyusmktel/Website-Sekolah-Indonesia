'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('hero_slides', 'tag', {
            type: Sequelize.STRING,
            allowNull: true,
            after: 'cta_link'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('hero_slides', 'tag');
    }
};
