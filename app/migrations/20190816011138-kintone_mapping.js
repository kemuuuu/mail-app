'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('kintone_mappings', 'template_key_id', {
      allowNull: false,
      type: Sequelize.STRING
    })
    .then(() => {
      return queryInterface.removeColumn('kintone_mappings', 'kintone_function_id', {
        allowNull: false,
        type: Sequelize.STRING
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('kintone_mappings', 'template_key_id', {
      allowNull: false,
      type: Sequelize.STRING
    })
    .then(() => {
      return queryInterface.addColumn('kintone_mappings', 'kintone_function_id', {
        allowNull: false,
        type: Sequelize.STRING
      })
    })
  }
};
