const axios = require('../axiosCfg');

function handleMessage(client, replyToken, message) {
  let query = message.text.toLowerCase().split(' ');
  const req = query[0];
  query = query.slice(1).join(' ');

  switch (req) {
    case 'cari':
      if (query === '') {
        return client.replyMessage(replyToken, {
          type: 'text',
          text: 'Tolong Masukan nama movie yang ingin di cari',
        });
      }
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

    case 'trending':
      return axios
        .get('/trending/movie/week')
        .then(async ({ data: { results } }) => {
          if (results.length === 0) {
            throw new Error('Tidak ada hot movie');
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
          text: 'Tidak bisa menampilkan hot movie',
        }));

    case 'recommend':
      return axios
        .get('/movie/299536/recommendations')
        .then(async ({ data: { results } }) => {
          if (results.length === 0) {
            throw new Error('Tidak rekomendasi movie');
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
          text: 'Tidak bisa menampilkan rekomendasi',
        }));

    case 'popular':
      return axios
        .get('/movie/popular', {
          params: {
            region: 'ID',
          },
        })
        .then(async ({ data: { results } }) => {
          if (results.length === 0) {
            throw new Error('Tidak ada movie populer');
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
          text: 'Tidak bisa menampilkan movie popular',
        }));

    case 'upcoming': {
      const US = axios.get('/movie/upcoming', {
        params: {
          region: 'US',
        },
      });

      const ID = axios.get('/movie/upcoming', {
        params: {
          region: 'ID',
        },
      });

      return Promise.all([US, ID])
        .then(async ([us, id]) => {
          const usResult = us.data.results.slice(0, 7);
          const idResult = id.data.results.slice(0, 1);

          const results = [...usResult, ...idResult];

          if (results.length === 0) {
            throw new Error('Tidak ada movie populer');
          }

          const columns = await results.map(v => ({
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
          text: 'Tidak dapat melihat upcoming movie',
        }));
    }

    default:
      return client.replyMessage(replyToken, {
        type: 'text',
        text: 'default berjalan',
      });
  }
}

module.exports = handleMessage;
