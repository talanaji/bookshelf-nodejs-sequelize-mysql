
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  };
  books.init({
    title: DataTypes.STRING,
    isbn: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'books',
    timestamps: false,

  });
  return books;
};