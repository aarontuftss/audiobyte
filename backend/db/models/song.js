'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    songUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    Song.hasMany(models.Comment, { foreignKey: "songId" });
    Song.hasMany(models.Like, { foreignKey: "songId" });
    Song.hasMany(models.Comment, { foreignKey: "songId" });
  };

  Song.getAll = async function ( id ){

  }

  return Song;
};