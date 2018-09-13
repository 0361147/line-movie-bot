const express = require('express');
const line = require('@line/bot-sdk');
const clientCfg = require('./config');
const handleEvent = require('./handler');

const app = express();

app.post('/callback', line.middleware(clientCfg), (req, res) => {
  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    res.status(500).end();
  }

  // handle events separately
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.get('/', (req, res) => {
  res.send('Line server bot is runing');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
