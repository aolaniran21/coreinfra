"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert("Cards", [
      {
        userId: 1, // Corresponds to John Doe
        status: "active",
        cardNumber: "123456789012",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2, // Corresponds to Jane Smith
        status: "pending",
        cardNumber: "987654321098",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete("Cards", null, {});
  },
};
