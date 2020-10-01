const { Server } = require('boardgame.io/server');
const { ReConnectFour } = require('./Game');

const server = Server({ games: [ReConnectFour] });

server.run(8000);