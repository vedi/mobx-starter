const path = require('path');

export default {
  http: {
    port: 2000,
    favicon: path.join(__dirname, '../assets/favicon.ico'),
    static: [
      {
        url: '/build',
        path: path.join(__dirname, '../../build')
      }
    ]
  }
}
