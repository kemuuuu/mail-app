'use strict';
module.exports = (sequelize, DataTypes) => {
  const kintone_function = sequelize.define('kintone_function', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    template_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    kintone_appId: DataTypes.STRING,
    kintone_spaceId: DataTypes.STRING
  }, {});
  kintone_function.associate = function(models) {
    kintone_function.belongsTo(models.template, {
      foreignKey: 'template_id',
      targetKey: 'id'
    });
  };
  return kintone_function;
};