const EggObsClient = require('./lib');

module.exports = app => {
  const obs = app.config.obs;
  app.obs = new EggObsClient(obs);
};