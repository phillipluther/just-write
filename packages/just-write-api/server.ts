import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import postsRouter from './resources/posts/posts.router';

const app = express();

const config = {
  isProd: process.env.node_env === 'production',
  host: 'http://localhost',
  port: 8001,
};

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan(config.isProd ? 'common' : 'dev'));

// routing
app.use('/posts', postsRouter);

export function start() {
  try {
    app.listen(config.port, () => {
      console.log(`[just-write-api] Listening at ${config.host}:${config.port}`);
    });
  } catch (err) {
    //
    // additional logging
    //
    console.error(err);
  }
}
