import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import createRoutes from './create-routes';
import { ServerOptions, ContentAdapter } from '$types';

export default async function (contentAdapter: ContentAdapter, options: ServerOptions) {
  try {
    const app = express();

    app.disable('x-powered-by');

    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(morgan(options.production ? 'common' : 'dev'));

    app.use(await createRoutes(contentAdapter));

    return {
      app,
      start: () => {
        app.listen(options.port, () => {
          console.log(`[just-write-api] Listening at ${options.host}:${options.port}`);
        });
      },
    };
  } catch (err) {
    //
    // logging
    //
    console.error(err);
  }
}
