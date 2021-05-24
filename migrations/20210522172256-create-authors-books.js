'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('authors_books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      book_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      author_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('authors_books');
  }
};