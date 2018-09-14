const axios = require('../axiosCfg');
const qr = require('./quickRespon');

function handlePostback(client, replyToken, message) {
  const [req, param] = message.split(' ');
  switch (req) {
    case 'detail':
      return axios
        .get(`movie/${param}`, {
          params: {
            language: 'en-US',
            append_to_response: 'videos',
          },
        })
        .then(({
          data: {
            overview, poster_path, release_date, title, vote_average, videos,
          },
        }) => {
          const release = new Date(release_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          return client.replyMessage(replyToken, [
            {
              type: 'image',
              originalContentUrl: `https://image.tmdb.org/t/p/w500${poster_path}`,
              previewImageUrl: `https://image.tmdb.org/t/p/w500${poster_path}`,
            },
            {
              type: 'text',
              text: `https://www.youtube.com/watch?v=${videos.results[0].key}`,
            },
            {
              type: 'text',
              text: `\uD83D\uDE80 ${title}
\uD83D\uDCC5 ${release}
\u2605 ${vote_average}

${overview}
          `,
              ...qr,
            },
          ]);
        })
        .catch(() => client.replyMessage(replyToken, {
          type: 'text',
          text: 'Detail movie tidak ditemukan',
          ...qr,
        }));

    default:
      return client.replyMessage(replyToken, {
        type: 'text',
        text: 'default postback berjalan',
        ...qr,
      });
  }
}

module.exports = handlePostback;
