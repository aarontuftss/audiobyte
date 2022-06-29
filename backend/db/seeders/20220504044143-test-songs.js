'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        name: 'lorem ipsum',
        artistId: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm03968loMm68RYdorFaJLIXq336l_KOZIzQ&usqp=CAU'
      },
      {
        name: 'oh yeah',
        artistId: 2,
        image: 'https://i.scdn.co/image/ab67616d0000b2733bdb97a4d69f514d8375a4a1'
      },
      {
        name: 'lofi sample',
        artistId: 3,
        image: 'https://f4.bcbits.com/img/a1933835359_16.jpg'
      },
      {
        name: 'testing 123',
        artistId: 1,
        image: 'https://i1.sndcdn.com/artworks-6BahOynoz5SfHcB7-yAtcDw-t240x240.jpg'
      },
      {
        name: 'sample work',
        artistId: 2,
        image: 'https://m.media-amazon.com/images/I/6174VwMfxRL._SX354_SY354_BL0_QL100__UXNaN_FMjpg_QL85_.jpg'
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
