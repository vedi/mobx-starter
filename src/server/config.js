const path = require('path');

const config = require('config/config');

export default {
  http: {
    port: config.port,
    favicon: path.join(__dirname, '../assets/favicon.ico'),
    static: [
      {
        url: '/build',
        path: path.join(__dirname, '../../build'),
      },
    ],
  },
};
