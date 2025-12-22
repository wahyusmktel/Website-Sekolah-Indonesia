'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('visitor_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ip_address: {
        type: Sequelize.STRING(45), // Supports IPv6
        allowNull: false
      },
      user_agent: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      path: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      referrer: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add indexes for performance
    await queryInterface.addIndex('visitor_logs', ['created_at']);
    await queryInterface.addIndex('visitor_logs', ['ip_address']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('visitor_logs');
  }
};
