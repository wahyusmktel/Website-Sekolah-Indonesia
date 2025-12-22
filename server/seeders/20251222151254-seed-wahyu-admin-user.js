'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admins', [
      {
        username: 'wahyurah55',
        password: '$2b$10$maXuT99P1Y86YgVTchvEe...S.FYccZjHrZZVBCIUQQUHi3aKd5IW.', // 10Juli1995?
        name: 'Wahyu Rahmadhani',
        created_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', { username: 'wahyurah55' }, {});
  }
};
