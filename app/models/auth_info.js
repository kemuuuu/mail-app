'use strict';
module.exports = (sequelize, DataTypes) => {
  const auth_info = sequelize.define('auth_info', {
    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    token: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    type: DataTypes.STRING,
    base_url: DataTypes.STRING
  }, {});
  auth_info.associate = function(models) {
    // associations can be defined here
  };
  return auth_info;
};