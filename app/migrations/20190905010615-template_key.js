'use strict';

module.exports = {
  
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('template_keys', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
