'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: {
      allowNull: false,
      references: {model: 'Users'},
      type: DataTypes.INTEGER
    }
    songId: {
      type: DataTypes.INTEGER,
      references: {model: 'Songs'},
      allowNull: false
    }
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.User, { foreignKey: "userId" });
    Like.belongsTo(models.Song, { foreignKey: "songId" });
  };

  Like.getUserLikes = async function (id){
    return await Like.findAll({
      where: {userId: id}
      include: [User, Song],
      order: [["createdAt", "ASC"]]
    })
  }


  return Like;
};