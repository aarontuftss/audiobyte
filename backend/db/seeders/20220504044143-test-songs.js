'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        name: 'lorem ipsum',
        artistId: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm03968loMm68RYdorFaJLIXq336l_KOZIzQ&usqp=CAU',
        songUrl: 'https://cdns-preview-6.dzcdn.net/stream/c-6bb4f188ca7f45f195845350d0a03faf-3.mp3'
      },
      {
        name: 'oh yeah',
        artistId: 2,
        image: 'https://i.scdn.co/image/ab67616d0000b2733bdb97a4d69f514d8375a4a1',
        songUrl: 'https://cdns-preview-a.dzcdn.net/stream/c-a85fb5e05a73f9d2fc543f827714b178-3.mp3'
      },
      {
        name: 'lofi sample',
        artistId: 3,
        image: 'https://f4.bcbits.com/img/a1933835359_16.jpg'
      },
      {
        name: 'testing 123',
        artistId: 1,
        image: 'https://i1.sndcdn.com/artworks-6BahOynoz5SfHcB7-yAtcDw-t240x240.jpg',
        songUrl: 'https://cdns-preview-d.dzcdn.net/stream/c-d032f8a34c532a3a3f8d701f54f19c13-3.mp3'
      },
      {
        name: 'sample work',
        artistId: 2,
        image: 'https://m.media-amazon.com/images/I/6174VwMfxRL._SX354_SY354_BL0_QL100__UXNaN_FMjpg_QL85_.jpg',
        songUrl: 'https://cdns-preview-c.dzcdn.net/stream/c-cf080e27aaacf1528974d4f843af9359-3.mp3'
      },
      {
        name: 'tokyo revenge',
        artistId: 2,
        image: 'https://e-cdns-images.dzcdn.net/images/cover/9ea68190ba23ce91dc288ce26d2c3260/250x250-000000-80-0-0.jpg',
        songUrl: 'https://cdns-preview-6.dzcdn.net/stream/c-6ea0360ea8b022ae6ba9bff6db112986-3.mp3'
      },
      {
        name: 'club cyberia',
        artistId: 2,
        image: 'https://e-cdns-images.dzcdn.net/images/cover/9ea68190ba23ce91dc288ce26d2c3260/250x250-000000-80-0-0.jpg',
        songUrl: 'https://cdns-preview-d.dzcdn.net/stream/c-dfe2c12184d1f91f289a7c2ef61aca3a-3.mp3'
      },
      {
        name: 'drifter',
        artistId: 2,
        image: 'https://e-cdns-images.dzcdn.net/images/cover/9ea68190ba23ce91dc288ce26d2c3260/250x250-000000-80-0-0.jpg',
        songUrl: 'https://cdns-preview-1.dzcdn.net/stream/c-12d4923ff5e099802f05831dc8dc2b5d-3.mp3'
      },
      {
        name: 'total requiem',
        artistId: 2,
        image: 'https://e-cdns-images.dzcdn.net/images/cover/9ea68190ba23ce91dc288ce26d2c3260/250x250-000000-80-0-0.jpg',
        songUrl: 'https://cdns-preview-0.dzcdn.net/stream/c-0e0cd95d90ffdb50484166e1717f150f-3.mp3'
      },
      {
        name: 'emptiness',
        artistId: 2,
        image: 'https://e-cdns-images.dzcdn.net/images/cover/9ea68190ba23ce91dc288ce26d2c3260/250x250-000000-80-0-0.jpg',
        songUrl: 'https://cdns-preview-7.dzcdn.net/stream/c-7fe2ea82711a3c3edec7a965e2cef235-3.mp3'
      },
      {
        name: 'aura',
        artistId: 2,
        image: 'https://e-cdns-images.dzcdn.net/images/cover/9ea68190ba23ce91dc288ce26d2c3260/250x250-000000-80-0-0.jpg',
        songUrl: 'https://cdns-preview-6.dzcdn.net/stream/c-63bdd06793451ed03120a7b7797dd115-3.mp3'
      },
      {
        name: 'solitude',
        artistId: 2,
        image: 'https://e-cdns-images.dzcdn.net/images/cover/9ea68190ba23ce91dc288ce26d2c3260/250x250-000000-80-0-0.jpg',
        songUrl: 'https://cdns-preview-e.dzcdn.net/stream/c-e45cfe5dc17211bd4a9ebafcbd9cf009-3.mp3'
      },
      
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
