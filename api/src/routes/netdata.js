module.exports = (app, authenticate, axios) => {
  const apiVersion = '/api/v1';
  const instances = [
    { endpoint: '/netdata-do', api: process.env.NETDATA_DO_URL + apiVersion },
    { endpoint: '/netdata-home', api: process.env.NETDATA_HOME_URL + apiVersion }
  ];

  instances.forEach(({ endpoint, api }) => {
    app.get(endpoint, authenticate, ({ res }) => {
      const params = '&points=90&group=average&after=-90&format=array&options=absolute';
      const cpuEndpoint = api + '/data?chart=system.cpu' + params;
      const infoEndpoint = api + '/info';

      axios.all([axios.get(infoEndpoint), axios.get(cpuEndpoint)]).then(
        axios.spread((info, cpu) => {
          res.send({ info: info.data, cpu: cpu.data });
        })
      );
    });
  });
};
