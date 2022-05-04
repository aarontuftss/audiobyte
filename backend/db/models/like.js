'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
  };
  return Like;
};