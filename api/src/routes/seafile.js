module.exports = (app, authenticate, axios) => {
  app.get('/seafile', authenticate, ({ res }) => {
    axios(process.env.SEAFILE_URL + '/api2/repos/', {
      headers: {
        Authorization: 'Token ' + process.env.SEAFILE_TOKEN
      }
    })
      .then(response => res.send(response.data))
      .catch(error => res.send(error));
  });
};
