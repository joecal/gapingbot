const express = require('express');
const app = express();
const https = require("https");
const Moment = require('moment');
const MomentRange = require('moment-range');

const server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  let port = server.address().port;
  console.log('App listening at port:' + port);
}

function runBot() {
  let moment       = MomentRange.extendMoment(Moment);
  let when         = moment().utcOffset("-04:00");
  let timeInterval = [moment('00', 'HH'), moment('06', 'HH')];
  let range        = moment.range(timeInterval);
  let inRange      = when.within(range);

  try {
    if (inRange) {
      console.log('Pinging myself to stay awake.')
      https.get("https://yourGAPingBot.herokuapp.com/"); // <<= Replace with your GAPingBot heroku app URL
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

setInterval(runBot, 1800000); // 1800000 = 30 minutes
