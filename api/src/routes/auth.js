module.exports = (app, authenticate, axios) => {
  app.get('/auth', authenticate, ({ res }) => {
    res.send(200);
  });
};
