require("dotenv").config();

const axios = require("axios");
const express = require("express");
const cors = require("cors");

const { BlazeHistory } = require("./database/mongodb/models/BlazeHistory");

//start app
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

let status = false;

app.get("/", (request, response) => {
  response.json({ status });
});

app.get("/start", (request, response) => {
  status = true;
  // start();
  return response.json({ desc: "ligado" });
});

app.get("/end", (request, response) => {
  status = false;
  return response.json({ desc: "desligado" });
});

const start = async () => {
  if (!status) return;

  const { data: blaze_data } = await axios.get(
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
  start();
};

//listen
app.listen(process.env.PORT || 3000);
