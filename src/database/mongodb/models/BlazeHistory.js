const { createConnection } = require("mongoose");
const dbConfig = require("../config/mongodb");
const { BlazeHistorySchema } = require("../schemas/BlazeHistory");

const conn = createConnection(dbConfig);

const BlazeHistory = conn.model("blazehistory", BlazeHistorySchema);

module.exports = { BlazeHistory };
