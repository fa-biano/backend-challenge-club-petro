'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('places',
    [
      {
        country_id: 1,
        place_name: 'Sao Paulo',
        meta: '2023-07-01',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        country_id: 1,
        place_name: 'Rio de Janeiro',
        meta: '2024-06-01',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        country_id: 1,
        place_name: 'Bonito',
        meta: '2023-06-01',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('places', null, {});
  }
};
