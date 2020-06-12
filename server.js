const http = require('http');
const app = require('./main');
const port = process.env.PORT || 2021;

const server = http.createServer(app);

server.listen(port);

console.log("server running on:" + port);