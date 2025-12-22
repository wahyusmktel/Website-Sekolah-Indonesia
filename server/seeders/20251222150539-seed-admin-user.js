'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admins', [
      {
        username: 'admin',
        password: '$2b$10$8Hvm/GdOX.gtkjRhT7kWvO99juPwr9xDtQnajeophRBKP2ib/aH0ii', // admin123
        name: 'Administrator',
        created_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', { username: 'admin' }, {});
  }
};
