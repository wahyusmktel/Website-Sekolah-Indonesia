'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Add footer_description to site_settings
    await queryInterface.addColumn('site_settings', 'footer_description', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: 'Membangun masa depan melalui inovasi pendidikan vokasi yang relevan dengan kebutuhan industri global.'
    });

    // 2. Create privacy_policy table
    await queryInterface.createTable('privacy_policy', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Kebijakan Privasi'
      },
      content: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      last_updated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('site_settings', 'footer_description');
    await queryInterface.dropTable('privacy_policy');
  }
};
