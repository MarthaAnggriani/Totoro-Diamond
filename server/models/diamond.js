'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diamond extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Diamond.hasMany(models.Cart, { foreignKey: "DiamondId" })
    }
  }
  Diamond.init({
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Diamond',
  });
  return Diamond;
};