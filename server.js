const express = require('express');
const app = express();
const https = require("https");
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const when = moment().utcOffset("-04:00");
const timeInterval = [moment('00', 'HH'), moment('06', 'HH')];
const range = moment.range(timeInterval);
const inRange = when.within(range);

const server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  let port = server.address().port;
  console.log('App listening at port:' + port);
}

function runBot() {

  console.log("Starting...");

  try {
    if (inRange) {
      console.log('Pinging myself to stay awake.')
      setTimeout(() => {
        https.get("https://yourGAPingBot.herokuapp.com/"); // <<= Replace with your GAPingBot heroku app URL
      }, 1800000); // 1800000 = 30 minutes
      setTimeout(runBot, 1800000);
    } else {
      console.log("Pinging GAbot, then I'm going to sleep.")
      https.get("https://yourGAbot.herokuapp.com/"); // <<= Replace with your GAbot heroku app URL
    }
  } catch (error) {
    console.log('Caught this error: ', error)
    console.log("Pinging again...")
    setTimeout(runBot, 10000); // 10000 = 10 seconds
  }

};

runBot();
