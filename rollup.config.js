import terser from '@rollup/plugin-terser';
import { glob } from 'glob';

export default [
  // Main bundle with all components
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
        sourcemap: true
      },
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'IpayButtons',
        sourcemap: true
      }
    ],
    plugins: [terser()]
  },
  // Individual component bundles for tree-shaking
  {
    input: Object.fromEntries(
      glob.sync('src/components/*.js').map(file => [
        file.replace('src/components/', '').replace('.js', ''),
        file
      ])
    ),
    output: {
      dir: 'dist/components',
      format: 'es',
      sourcemap: true
    },
    plugins: [terser()]
  }
];