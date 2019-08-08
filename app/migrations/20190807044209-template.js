'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('templates', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    })
    .then(() => {
      return queryInterface.changeColumn('templates', 'address', {
        type: Sequelize.STRING,
        allowNull: false
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('templates');
  }
};
