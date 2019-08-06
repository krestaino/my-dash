module.exports = (app, authenticate, axios) => {
  app.get('/plex', authenticate, ({ res }) => {
    axios(process.env.PLEX_URL + '/status/sessions', {
      params: {
        'X-Plex-Token': process.env.PLEX_TOKEN
      }
    })
      .then(response => res.send(response.data))
      .catch(error => res.send(error));
  });
};
