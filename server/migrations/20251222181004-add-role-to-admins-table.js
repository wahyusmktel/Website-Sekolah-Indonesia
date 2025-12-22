'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('admins', 'role', {
      type: Sequelize.ENUM('superadmin', 'hubin', 'kesiswaan'),
      allowNull: false,
      defaultValue: 'superadmin' // Defaulting to superadmin for existing users, can be changed later
    });

    // Update specific user wahyurah55 to superadmin (though it's default here)
    await queryInterface.sequelize.query(
      "UPDATE admins SET role = 'superadmin' WHERE username = 'wahyurah55'"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('admins', 'role');
    // Note: ENUM type cleanup might be needed for some DBs, but removeColumn is usually enough for MySQL.
  }
};
