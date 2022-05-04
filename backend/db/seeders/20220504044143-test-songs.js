'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        name: 'lorem ipsum',
        artistId: 1,
      },
      {
        name: 'oh yeah',
        artistId: 2,
      },
      {
        name: 'lofi sample',
        artistId: 3,
      },
      {
        name: 'testing 123',
        artistId: 1,
      },
      {
        name: 'sample work',
        artistId: 2,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Songs', null, {});
  }
};
