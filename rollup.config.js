import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import browsersync from 'rollup-plugin-browsersync';

module.exports = {
  input: 'js/main.js',
  output: {
    dir: 'app',
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: false
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    browsersync({server: 'app'})
  ]
};