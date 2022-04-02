import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import polyfills from 'rollup-plugin-node-polyfills';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/index.js',
      format: 'cjs',
    },
    {
      file: 'lib/index.mjs',
      format: 'es',
    },
  ],
  plugins: [
    // typescript()
    // polyfills(),
    nodeResolve(),
    commonjs({
      include: /node_modules/,
    }),
  ],
};
