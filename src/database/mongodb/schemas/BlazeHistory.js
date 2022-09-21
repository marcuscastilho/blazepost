const { Schema } = require("mongoose");

const BlazeHistorySchema = new Schema(
  {
    blaze_id: { type: String, required: true },
    crash_point: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = { BlazeHistorySchema };
