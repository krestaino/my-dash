const { Bearer } = require('permit');

const permit = new Bearer({
  query: 'API_KEY'
});

module.exports = (req, res, next) => {
  const token = permit.check(req);

  if (token !== process.env.API_KEY) {
    permit.fail(res);
    return next('API: Invalid API_KEY');
  }

  next();
};
