module.exports = app => {
  app.get('/ping', ({ res }) => {
    res.send('pong');
  });
};
