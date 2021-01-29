const { Location } = require("../db/models");
const moment = require("moment");
const v4 = require("uuid").v4;

const createLocation = async () => {
  const locations = await Location.count();

  if (locations) {
    return Location.count();
  } else {
    Location.create({
      id: v4(),
      name: "Memorial Hermann",
      address: "Houston",
      numberofSlots: 5,
    });
    return Location.count();
  }
};

module.exports = createLocation;
