module.exports = (app, authenticate, axios) => {
  app.get('/unifi', authenticate, ({ res }) => {
    axios
      .post(process.env.UNIFI_URL + '/api/login', {
        username: process.env.UNIFI_USERNAME,
        password: process.env.UNIFI_PASSWORD,
        remember: false,
        strict: true
      })
      .then(response => {
        axios(process.env.UNIFI_URL + '/api/s/default/stat/health', {
          headers: {
            cookie: response.headers['set-cookie'].toString()
          }
        })
          .then(response => res.send(response.data))
          .catch(error => res.send(error));
      })
      .catch(error => res.send(error));
  });
};
