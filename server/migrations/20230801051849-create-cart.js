'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      DiamondId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Diamonds',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      AccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      isPaid: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};