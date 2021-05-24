'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      title: {
        type: Sequelize.STRING
      },
      isbn: {
        type: Sequelize.STRING(13)
      },
      description: {
        type: Sequelize.TEXT
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books');
  }
};