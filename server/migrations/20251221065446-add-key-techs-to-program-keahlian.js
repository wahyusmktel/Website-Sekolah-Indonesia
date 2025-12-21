'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('program_keahlian', 'key_techs', {
      type: Sequelize.JSON,
      allowNull: true,
      after: 'prospects'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('program_keahlian', 'key_techs');
  }
};
