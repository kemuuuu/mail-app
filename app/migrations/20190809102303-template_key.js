'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('template_keys', 'sort')
    .then(() => {
      return queryInterface.addColumn('template_keys', 'sort_number', {
        allowNull: false,
        type: Sequelize.INTEGER
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('template_keys');
  }
};
