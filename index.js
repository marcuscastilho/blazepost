require("dotenv").config();
const axios = require("axios");
const { BlazeHistory } = require("./src/database/mongodb/models/BlazeHistory");

const start = async () => {
  const { data: blaze_data} = await axios.get(
    "https://blaze.com/api/crash_games/recent"
  );

  for (const item of blaze_data) {
    const record = await BlazeHistory.find({
      blaze_id: item.id,
    });

    if (!record.length) {
      await BlazeHistory.create({
        blaze_id: item.id,
        crash_point: item.crash_point,
      });
    }
  }
  start()
};

start();
