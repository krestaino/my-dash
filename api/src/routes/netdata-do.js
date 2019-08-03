module.exports = (app, authenticate, axios) => {
  app.get("/netdata-do", authenticate, ({ res }) => {
    axios(process.env.NETDATA_DO_URL + "/api/v1/info")
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        res.send(error);
      });
  });
};
