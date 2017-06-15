const express       = require('express');
const app           = express();
const https         = require("https");
const Moment        = require('moment');
const MomentRange   = require('moment-range');
const moment        = MomentRange.extendMoment(Moment);
const when          = moment();
const timeInterval  = [moment('22', 'HH'), moment('05', 'HH')];
const range         = moment.range(timeInterval);
const inRange       = when.within(range);

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
      setInterval( () => {
          https.get("https://yourUsername-yourGAPingBotName.herokuapp.com/"); // <<= Replace with your GAPingBot heroku app
      }, 1800000); // every 30 minutes
    } else {
      console.log("Pinging GAbot, then I'm going to sleep.")
      https.get("https://yourUsername-yourGAbotName.herokuapp.com/"); // <<= Replace with your GAbot heroku app URL
    }
  }

  catch (error) {
    console.log('Caught this error: ', error)
  }

};

runBot();
