import createServer from './create-server';
import loadAdapter from './load-adapter';

const defaultOptions = {
  isProd: process.env.node_env === 'production',
  host: 'http://localhost',
  port: 8001,
};

export default async function init(userOptions = {}) {
  try {
    const { default: contentAdapter } = await loadAdapter();

    const options = { ...defaultOptions, ...userOptions };
    const server = createServer(contentAdapter, options);

    server.start();
  } catch (err) {
    //
    // additional logging
    //
    console.error(err);
  }
}
