
module.exports = {
  port: process.env.PORT || 2000,
  backend: process.env.BACKEND || 'localhost:1340',
  client: {
    clientId: 'default' || process.env.CLIENT_ID,
    clientSecret: 'default' || process.env.CLIENT_SECRET
  },
};
