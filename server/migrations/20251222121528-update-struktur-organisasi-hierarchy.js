'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('struktur_organisasi', 'parent_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'struktur_organisasi',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('struktur_organisasi', 'connection_type', {
      type: Sequelize.ENUM('subordinate', 'coordination'),
      defaultValue: 'subordinate'
    });

    // Update the type ENUM by changing it to STRING temporarily or just adding more values if supported.
    // In MySQL, it's safer to change type to STRING first if we want to change ENUM values.
    await queryInterface.changeColumn('struktur_organisasi', 'type', {
      type: Sequelize.STRING(50),
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('struktur_organisasi', 'parent_id');
    await queryInterface.removeColumn('struktur_organisasi', 'connection_type');
    await queryInterface.changeColumn('struktur_organisasi', 'type', {
      type: Sequelize.ENUM('kepala_sekolah', 'wakil_kepala_sekolah', 'ketua_jurusan'),
      allowNull: false
    });
  }
};
