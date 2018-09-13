const axios = require('axios');

const instance = axios.create({
  baseURL: 'ttps://api.themoviedb.org/3/',
  timeout: 60 * 3 * 1000,
  params: {
    api_key: process.env.TMDB_KEY,
  },
});

module.exports = instance;
