module.exports = (app, authenticate, axios) => {
  app.get('/uptime-robot', authenticate, ({ res }) => {
    axios
      .post(process.env.UPTIME_ROBOT_URL, {
        api_key: process.env.UPTIME_ROBOT_KEY
      })
      .then(response => res.send(response.data))
      .catch(error => res.send(error));
  });
};
