const { Slot, Location } = require("../db/models");
const moment = require("moment");
const v4 = require("uuid").v4;

const createSlots = async (amount, startDate, runDays) => {
  Slot.destroy({ truncate: true });
  const locations = await Location.findAll();

  locations.forEach((location) => {
    const newSlots = [];

    for (let i = 0; i < runDays; i++) {
      for (let j = 0; j < amount; j++) {
        const currentHour = moment(startDate).add(i, "days").add(j, "hours");
        newSlots.push({
          id: v4(),
          day: currentHour,
          locationId: location.id,
          isReserved: false,
        });
      }
    }
    Slot.bulkCreate(newSlots);
  });
};

module.exports = createSlots;
