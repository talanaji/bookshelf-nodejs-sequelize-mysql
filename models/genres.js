
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class genres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  };
  genres.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'genres',
    timestamps: false,

  });
  return genres;
};