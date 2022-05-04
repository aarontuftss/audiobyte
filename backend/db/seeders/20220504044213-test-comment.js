'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        text: 'so good',
        userId: 2,
        songId: 1,
      },
      {
        text: 'cant believe it',
        userId: 2,
        songId: 2,
      },
      {
        text: 'hello',
        userId: 2,
        songId: 3,
      },
      {
        text: 'omg',
        userId: 2,
        songId: 1,
      },
      {
        text: 'need more',
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
