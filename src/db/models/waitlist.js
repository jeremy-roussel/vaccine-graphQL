"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Waitlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Waitlist.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      userId: DataTypes.STRING,
      day: DataTypes.DATE,
      locationId: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Waitlist",
    }
  );
  return Waitlist;
};
