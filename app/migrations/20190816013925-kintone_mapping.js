'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('kintone_mappings', 'template_key_id', {
      allowNull: false,
      type: Sequelize.INTEGER
    })
    .then(() => {
      return queryInterface.addColumn('kintone_mappings', 'kintone_function_id', {
        allowNull: false,
        type: Sequelize.INTEGER
      })
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
