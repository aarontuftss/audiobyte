'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Likes', [
      {
        userId: 2,
        songId: 1,
      },
      {
        userId: 2,
        songId: 2,
      },
      {
        userId: 2,
        songId: 3,
      },
      {
        userId: 2,
        songId: 1,
      },
      {
        userId: 2,
        songId: 1,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
