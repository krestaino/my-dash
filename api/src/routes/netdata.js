module.exports = (app, authenticate, axios) => {
  const instances = [
    { endpoint: '/netdata-do', upstream: process.env.NETDATA_DO_URL },
    { endpoint: '/netdata-home', upstream: process.env.NETDATA_HOME_URL }
  ];

  instances.forEach(({ endpoint, upstream }) => {
    app.get(endpoint, authenticate, ({ res }) => {
      axios.get(upstream + '/api/v1/info').then(response => res.send({ info: response.data }));
    });
  });
};
