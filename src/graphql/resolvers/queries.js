const {
  Guarantee,
  Location,
  Slot,
  User,
  Waitlist,
} = require("../../db/models");

module.exports = {
  helloWorld: () => "Hello Apollo",

  getGuarantees: () => Guarantee.findAll(),

  getGuaranteeByPk: (_, { id }) => Guarantee.findByPk(id),

  getUsers: () => User.findAll(),

  getUserByPk: (_, { id }) => User.findByPk(id),

  getWaitlists: () => Waitlist.findAll(),

  getSlots: () => Slot.findAll(),

  getSlotByPk: (_, { id }) => Slot.findByPk(id),

  getLocationSlots: async (_, { id }) => {
    const location = await Location.findByPk(id);
    const slots = await Slot.findAll({
      where: { locationId: id, isReserved: false },
    });
    const pendingGuarantees = (
      await Guarantee.findAll({
        where: { locationId: id },
      })
    ).length;
    const pendingWaitlists = (
      await Waitlist.findAll({ where: { locationId: id } })
    ).length;

    return {
      location,
      availableSlots: slots.length,
      pendingGuarantees: pendingGuarantees.length,
      pendingWaitlists: pendingWaitlists.length,
      slots,
    };
  },

  getGuaranteeSlots: async (_, { guaranteeId }) => {
    const guarantee = await Guarantee.findByPk(guaranteeId);
    const location = await Location.findByPk(guarantee.locationId);
    const pendingGuarantees = await Guarantee.findAll({
      where: { locationId: location.id, isExpired: false },
    });
    const slots = await Slot.findAll({
      where: { isReserved: false, locationId: location.id },
    });
    const pendingWaitlists = await Waitlist.findAll({
      where: { locationId: location.id },
    });

    return {
      location,
      availableSlots: slots.length,
      pendingGuarantees: pendingGuarantees.length,
      pendingWaitlists: pendingWaitlists.length,
      slots,
    };
  },
};
