const line = require('@line/bot-sdk');
const clientCfg = require('../config');

const client = new line.Client(clientCfg);

function handleEvent(event) {
  switch (event.type) {
    case 'message':
      return client.replyMessage(event.replyToken, [
        {
          type: 'text',
          text: 'Thank You for follow this bot',
        },
        {
          type: 'text',
          text: 'Thank You for follow this bot',
        },
      ]);

    case 'follow':
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Thank You for follow this bot',
      });

    case 'unfollow':
      return console.log('some people unfollow this bot');

    case 'postback':
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'it run post back',
      });

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
