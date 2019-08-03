module.exports = (app, authenticate, axios) => {
  app.get("/uptime-robot", authenticate, ({ res }) => {
    axios
      .post("https://api.uptimerobot.com/v2/getMonitors", {
        api_key: process.env.UPTIME_ROBOT_KEY
      })
      .then(response => {
        let client = [];

        response.data.monitors.map(monitor => {
          const { id, friendly_name, status } = monitor;

          client.push({ id, friendly_name, status });
        });

        res.send(client);
      })
      .catch(error => {
        res.send(error);
      });
  });
};
