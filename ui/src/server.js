const handler = require('serve-handler');
const http = require('http');

const PORT = process.env.PORT;

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: 'build'
  });
});

server.listen(PORT, () => console.log('UI:  Accepting connections at http://localhost:' + PORT));
