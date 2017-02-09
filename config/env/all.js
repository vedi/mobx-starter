
module.exports = {
  port: process.env.PORT || 2000,
  backend: process.env.BACKEND || 'localhost:1340',
  client: {
    clientId: process.env.CLIENT_ID || 'default',
    clientSecret: process.env.CLIENT_SECRET || 'default',
  },
};
