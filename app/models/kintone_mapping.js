'use strict';
module.exports = (sequelize, DataTypes) => {
  const kintone_mapping = sequelize.define('kintone_mapping', {
    kintoneFieldId: {
      type: DataTypes.INTEGER,
      references: 'kintone_function',
      referencesKey: 'id',
      allowNull: false
    },
    templateKeyId: {
      type: DataTypes.INTEGER,
      references: 'template_key',
      referencesKey: 'id',
      allowNull: false
    }
  }, {});
  kintone_mapping.associate = function(models) {
    // associations can be defined here
  };
  return kintone_mapping;
};