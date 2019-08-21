'use strict';
module.exports = (sequelize, DataTypes) => {
  const kintone_field = sequelize.define('kintone_field', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    kintone_function_id: DataTypes.INTEGER,
    label: DataTypes.STRING,
    field_code: DataTypes.STRING
  }, {});
  kintone_field.associate = function(models) {
    kintone_field.belongsTo(models.kintone_function, {
      foreignKey: 'kintone_function_id',
      targetKey: 'id'
    });
    kintone_field.belongsToMany(models.template_key, { through: models.kintone_mapping });
  };
  return kintone_field;
};