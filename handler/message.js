const axios = require('../axiosCfg');

function handleMessage(client, replyToken, message) {
  console.log('text', message.text);
  let query = message.text.toLowerCase().split(' ');
  const req = query[0];
  console.log('req', req);
  query = query.slice(1).join(' ');
  console.log('query', query);

  switch (req) {
    case 'cari':
      console.log('cari berjalan');
      return axios
        .get('/search/movie', {
          params: {
            language: 'en-US',
            query,
          },
        })
        .then(async ({ data: { results } }) => {
          if (results.length === 0) {
            throw new Error('Movie tidak di temukan');
          }
          const columns = await results.slice(0, 9).map(v => ({
            imageUrl: `https://image.tmdb.org/t/p/w500${v.poster_path}`,
            action: {
              label: 'View Detail',
              type: 'postback',
              data: `detail ${v.id}`,
            },
          }));
          return client.replyMessage(replyToken, {
            type: 'template',
            altText: 'Movie list',
            template: {
              type: 'image_carousel',
              columns,
            },
          });
        })
        .catch(() => client.replyMessage(replyToken, {
          type: 'text',
          text: 'Movie tidak di temukan',
        }));

    default:
      return client.replyMessage(replyToken, {
        type: 'text',
        text: 'default berjalan',
      });
  }
}

module.exports = handleMessage;
