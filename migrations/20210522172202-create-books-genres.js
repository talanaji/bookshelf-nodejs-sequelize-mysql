'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books_genres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      book_id: {
        type: Sequelize.INTEGER(11)
      },
      genre_id: {
        type: Sequelize.INTEGER(11)
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books_genres');
  }
};