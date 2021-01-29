const {
  Guarantee,
  Location,
  Slot,
  User,
  Waitlist,
} = require("../../db/models");
const v4 = require("uuid").v4;

module.exports = {
  createGuarantee: (_, { model }) => Guarantee.create({ ...model, id: v4() }),

  createLocation: (_, { model }) => Location.create({ ...model, id: v4() }),

  createSlot: (_, { model }) => Slot.create({ ...model, id: v4() }),

  createAccount: (_, { model }) => User.create({ ...model, id: v4() }),

  createWaitlist: (_, { model }) => Waitlist.create({ ...model, id: v4() }),

  unreserveSlot: async (_, { id }) => {
    const slot = await Slot.findByPk(id);

    if (slot.isReserved) {
      await slot.update({ ...slot, isReserved: false, userId: null });
      return true;
    }
    return false;
  },

  slotToReserveRequest: async (_, { userId, slotId }) => {
    const guarantee = await Guarantee.findOne({ where: { userId } });
    if (!guarantee.isExpired) {
      const reservedSlot = await Slot.findByPk(slotId);
      if (!reservedSlot.isReserved) {
        return reservedSlot.update({
          ...reservedSlot,
          isReserved: true,
          userId,
        });
      }
    }
    return false;
  },

  deleteWaitlist: async (_, { id }) => {
    const deletedWaitlist = await Waitlist.destroy({ where: { id } });
    return deletedWaitlist ? true : false;
  },
};
