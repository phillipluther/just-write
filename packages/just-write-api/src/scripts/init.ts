import { ServerOptions } from '$types';
import createServer from './create-server';
import connectContentAdapter from './connect-content-adapter';

const defaultOptions = {
  isProd: process.env.node_env === 'production',
  host: 'http://localhost',
  port: 8001,
  adapter: 'json', // <-- testing!
};

export default async function init(userOptions = {}) {
  try {
    const options: ServerOptions = { ...defaultOptions, ...userOptions };
    const contentAdapter = await connectContentAdapter(options.adapter);
    const server = await createServer(contentAdapter, options);

    if (server) {
      server.start();
    }
  } catch (err) {
    //
    // additional logging
    //
    console.error(err);
  }
}
