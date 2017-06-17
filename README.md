# GAPingBot

## Purpose

- To ping/wakeup a GAbot from sleeping on heroku.

## Dependencies

- Git
- Node.js

## Local Installation via Terminal Command Line

Clone this repo then install with the following commands.

```
git clone git@github.com:joecal/gapingbot.git
cd gapingbot
npm install
```

## Heroku deployment via Terminal Command Line

Before deployment, make sure you already have your [GAbot](https://github.com/joecal/gabot "GAbot") deployed to heroku. After your GAbot is deployed, change the the URLs in the try block in the GAPingBots server.js file to your own heroku apps URLs.

```javascript
// server.js
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
```

Now run these commands to deploy to heroku.

```
git add .
git commit -m "Pushing to heroku"
heroku login
yourEmail@email.com     
yourPassword            
heroku create yourGAPingBotName --buildpack heroku/nodejs
git push heroku master
heroku ps:scale web=1
heroku logs -t
```
