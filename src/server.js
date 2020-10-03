/*import serve from 'koa-static';

const { Server } = require('boardgame.io/server');
const { ReConnectFour } = require('./Game');

const server = Server({ games: [ReConnectFour] });

server.router.get('/public/', (ctx, next) => {
  ctx.body = 'Custom Response'
});

server.run(8000);

*/

import { Server } from 'boardgame.io/server';
import path from 'path';
import serve from 'koa-static';
import { ReConnectFour } from './Game';

const server = Server({ games: [ReConnectFour] });
const PORT = process.env.PORT || 8000;

// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, '../public');
server.app.use(serve(frontEndAppBuildPath))

server.run(PORT, () => {
  server.app.use(
    async (ctx, next) => await serve(frontEndAppBuildPath)(
      Object.assign(ctx, { path: 'index.html' }),
      next
    )
  )
});