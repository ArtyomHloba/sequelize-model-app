'use strict';
/** @type {import('sequelize-cli').Migration} */

// unique, allowNull, check
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nickname: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      tel: {
        type: Sequelize.STRING(13),
        unique: true,
      },
      passw_hash: {
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.DATEONLY,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
      },
      role: {
        type: Sequelize.ENUM('executor', 'manager'),
        allowNull: false,
        defaultValue: 'executor',
      },
      image: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
