import { ServerOptions } from './__types__';
import createServer from './create-server';
import loadAdapter from './load-adapter';

const defaultOptions = {
  isProd: process.env.node_env === 'production',
  host: 'http://localhost',
  port: 8001,
};

export default async function init(userOptions = {}) {
  try {
    const options: ServerOptions = { ...defaultOptions, ...userOptions };
    const { default: contentAdapter } = await loadAdapter(options.adapter);
    const server = createServer(contentAdapter, options);

    server.start();
  } catch (err) {
    //
    // additional logging
    //
    console.error(err);
  }
}
