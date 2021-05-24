/* eslint-disable camelcase */



const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class authors_books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  };
  authors_books.init({
    book_id: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'authors_books',
    timestamps: false,

  });
  return authors_books;
};