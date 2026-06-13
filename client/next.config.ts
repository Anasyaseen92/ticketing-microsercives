module.exports = {
  webpackDevMiddleware: (config: any) => {
    config.watchOptions.poll = 300;
    return config;
  },

};