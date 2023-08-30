'use strict';
const fs = require("fs");
const diamondsData = JSON.parse(fs.readFileSync("./data/diamonds.json", "utf-8"));
diamondsData.map(e => {
  e.createdAt = e.updatedAt = new Date()
})
console.log(diamondsData);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Diamonds', diamondsData, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Diamonds', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
