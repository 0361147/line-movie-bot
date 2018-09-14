const line = require('@line/bot-sdk');
const clientCfg = require('../config');
const messageHandler = require('./message');
const postbackHandler = require('./postback');
const qr = require('./quickRespon');

const client = new line.Client(clientCfg);

function handleEvent(event) {
  switch (event.type) {
    case 'message':
      return messageHandler(client, event.replyToken, event.message);

    case 'follow':
      return client
        .getProfile(event.source.userId)
        .then(profile => client.replyMessage(event.replyToken, [
          {
            type: 'text',
            text: `Terima kasih ${
              profile.displayName
            } karena telah menambahkan saya sebagai teman.

Saya dapat membantu kamu untuk menemukan informasi dari movie yang ingin kamu cari yaitu dengan mengetik

cari nama movie

contoh:
cari The Nun
`,
          },
          {
            type: 'text',
            text:
                'Karena keterbatasan saya, maka deskripsi dari movie akan di tampilkan dalam bahasa inggris',
            ...qr,
          },
        ]))
        .catch(() => client.replyMessage(event.replyToken, [
          {
            type: 'text',
            text: `Terima kasih karena telah menambahkan saya sebagai teman.

Saya dapat membantu kamu untuk menemukan informasi dari movie yang ingin kamu cari yaitu dengan mengetik

cari nama movie

contoh:
cari The Nun
`,
          },
          {
            type: 'text',
            text:
                'Karena keterbatasan saya, maka deskripsi dari movie akan di tampilkan dalam bahasa inggris',
            ...qr,
          },
        ]));

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
