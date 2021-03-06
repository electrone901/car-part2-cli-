"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {


    classMethods: {
      associate: function(models) {
        // User.hasMany(models.Comment)
        User.hasMany(models.Post)
      }
    }


  });

  return User;
};



