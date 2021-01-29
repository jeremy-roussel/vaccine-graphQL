"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Slot.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      day: DataTypes.DATE,
      locationId: DataTypes.STRING,
      isReserved: DataTypes.BOOLEAN,
      userId: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Slot",
    }
  );
  return Slot;
};
