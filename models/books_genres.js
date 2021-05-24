/* eslint-disable camelcase */

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class books_genres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  };
  books_genres.init({
    book_id: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'books_genres',
    timestamps: false,

  });
  return books_genres;
};