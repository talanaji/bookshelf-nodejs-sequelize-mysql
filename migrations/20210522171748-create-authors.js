'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('authors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      name: {
        type: Sequelize.STRING
      },
      biography: {
        type: Sequelize.TEXT
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('authors');
  }
};