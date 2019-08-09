'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('template_keys', 'mail_id')
    .then(() => {
      return queryInterface.addColumn('template_keys', 'template_id', {
        type: Sequelize.INTEGER
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('template_keys');
  }
};
