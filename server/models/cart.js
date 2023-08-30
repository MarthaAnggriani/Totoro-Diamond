'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Diamond, { foreignKey: "DiamondId" })
      Cart.belongsTo(models.User, { foreignKey: "UserId" })
    }
  }
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "UserId is required" },
        notEmpty: { msg: "UserId is required" },
      }
    },
    DiamondId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "DiamondId is required" },
        notEmpty: { msg: "DiamondId is required" },
      }
    },
    AccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "AccountId is required" },
        notEmpty: { msg: "AccountId is required" },
      }
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      // allowNull: false,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};