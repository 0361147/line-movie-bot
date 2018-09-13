const line = require('@line/bot-sdk');
const clientCfg = require('../config');
const messageHandler = require('./message');
const postbackHandler = require('./postback');

const client = new line.Client(clientCfg);

function handleEvent(event) {
  switch (event.type) {
    case 'message':
      return messageHandler(client, event.replyToken, event.message);

    case 'follow':
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Thank You for follow this bot',
      });

    case 'unfollow':
      return console.log('some people unfollow this bot');

    case 'postback':
      return postbackHandler(client, event.replyToken, event.postback.data);

    case 'beacon':
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'it run beacon',
      });

    default:
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'We cant detect yout event type',
      });
  }
}

module.exports = handleEvent;
