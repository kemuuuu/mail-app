'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('auth_infos', 'token', {
      allowNull: false,
      type: Sequelize.STRING
    })
    .then(() => {
      return queryInterface.changeColumn('auth_infos', 'refresh_token', {
        allowNull: false,
        type: Sequelize.STRING
      })
    })
    .then(() => {
      return queryInterface.changeColumn('auth_infos', 'type', {
        allowNull: false,
        type: Sequelize.STRING
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('auth_infos');
  }
};
