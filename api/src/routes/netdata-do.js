module.exports = (app, authenticate, axios) => {
  function getData(endpoint) {
    return axios.get(endpoint);
  }

  app.get('/netdata-do', authenticate, ({ res }) => {
    const params = '&format=array&points=360&group=average&gtime=0&options=absolute%7Cjsonwrap%7Cnonzero&after=-2';
    const infoEndpoint = process.env.NETDATA_DO_URL + '/api/v1/info';
    const cpuEndpoint = process.env.NETDATA_DO_URL + '/api/v1/data?chart=system.cpu' + params;

    axios.all([getData(infoEndpoint), getData(cpuEndpoint)]).then(
      axios.spread((info, cpu) => {
        res.send({ info: info.data, cpu: cpu.data });
      })
    );
  });
};
