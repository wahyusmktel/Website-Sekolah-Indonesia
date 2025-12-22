'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('visitor_logs', 'session_id', {
      type: Sequelize.STRING(100),
      allowNull: true,
      after: 'id'
    });
    await queryInterface.addColumn('visitor_logs', 'log_type', {
      type: Sequelize.ENUM('session_start', 'page_view'),
      defaultValue: 'page_view',
      after: 'session_id'
    });

    // Add index for session analysis
    await queryInterface.addIndex('visitor_logs', ['session_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('visitor_logs', 'session_id');
    await queryInterface.removeColumn('visitor_logs', 'log_type');
  }
};
