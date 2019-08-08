module.exports = (app, authenticate, axios) => {
  const apiVersion = '/api/v1';
  const instances = [
    { endpoint: '/netdata-do', api: process.env.NETDATA_DO_URL + apiVersion },
    { endpoint: '/netdata-home', api: process.env.NETDATA_HOME_URL + apiVersion }
  ];

  instances.forEach(({ endpoint, api }) => {
    app.get(endpoint, authenticate, ({ res }) => {
      const params = '&points=90&group=average&after=-90';
      const cpuParams = params + '&format=array&options=absolute';
      const ramParams = '&format=json&options=jsonwrap';
      const ramUsageParams = params + '&format=array&options=percentage&dimensions=used|buffers|active|wired';

      const infoEndpoint = api + '/info';
      const cpuEndpoint = api + '/data?chart=system.cpu' + cpuParams;
      const ramEndpoint = api + '/data?chart=system.ram' + ramParams;
      const ramUsageEndpoint = api + '/data?chart=system.ram' + ramUsageParams;

      axios
        .all([axios.get(infoEndpoint), axios.get(cpuEndpoint), axios.get(ramEndpoint), axios.get(ramUsageEndpoint)])
        .then(
          axios.spread((info, cpu, ram, ramUsage) => {
            res.send({ info: info.data, cpu: cpu.data, ram: ram.data, ramUsage: ramUsage.data });
          })
        );
    });
  });
};
