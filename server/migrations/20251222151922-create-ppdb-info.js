'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PPDBInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      academic_year: {
        type: Sequelize.STRING
      },
      registration_link: {
        type: Sequelize.STRING
      },
      contact_person: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      admission_pathways: {
        type: Sequelize.JSON
      },
      timeline: {
        type: Sequelize.JSON
      },
      required_documents: {
        type: Sequelize.JSON
      },
      fees: {
        type: Sequelize.JSON
      },
      faq: {
        type: Sequelize.JSON
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PPDBInfos');
  }
};