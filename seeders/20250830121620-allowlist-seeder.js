'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('allowlist', [
      {
        domain: 'test1.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        domain: 'test2.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('allowlist', null, {});
  },
};
