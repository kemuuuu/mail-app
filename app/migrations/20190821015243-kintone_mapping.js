'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('kintone_mappings', 'kintone_function_id', 'kintoneFunctionId')
    .then(() => {
      return queryInterface.renameColumn('kintone_mappings', 'template_key_id', 'templateKeyId')
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
