'use strict';
module.exports = (sequelize, DataTypes) => {
  const template = sequelize.define('template', {
    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  template.associate = function(models) {
    template.hasMany(models.template_key, {foreignKey: 'template_id'});
  };
  return template;
};