import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import createRoutes from './create-routes';

export type ServerOptions = {
  production?: boolean;
  port: number;
  host: string;
};

export default function (contentAdapter: any, options: ServerOptions) {
  const app = express();

  app.disable('x-powered-by');

  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(morgan(options.production ? 'common' : 'dev'));

  app.use(createRoutes(contentAdapter));

  return {
    ...app,
    start: () => {
      app.listen(options.port, () => {
        console.log(`[just-write-api] Listening at ${options.host}:${options.port}`);
      });
    },
  };
}
