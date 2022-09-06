import {
  main as mainPath,
  module as modulePath,
  peerDependencies,
} from './package.json';

import { swc } from 'rollup-plugin-swc3';
import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import prettier from 'rollup-plugin-prettier';

export default [
  {
    input: 'src/index.ts',
    output: [
      // Outputs the packaged lib in the preview workspace 'playground'
      {
        file: 'playground/src/component-lib/index.js',
        format: 'esm',
        banner: '/* eslint-disable */',
      },
      // Outputs the packaged lib in CommonJS format
      { file: mainPath, format: 'cjs' },
      // Outputs the packaged lib in ES Module format
      { file: modulePath, format: 'esm' },
    ],
    plugins: [
      // Delete the previously created outputs
      del({ targets: ['dist/*', 'playground/src/component-lib/*'] }),
      // Transform typescript using ttypescript
      typescript({
        typescript: require('ttypescript'),
      }),
      // Allow importing and processing json files natively
      json(),
      // Run postcss, especially for tailwind (see postcss.config.js)
      postcss(),
      // Transpile with swc
      swc({
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true
          },
          target: "es5",
          loose: false,
          minify: {
            compress: false,
            mangle: false
          }
        },
      }),
      prettier(),
    ],
    external: Object.keys(peerDependencies || {}),
  },
];
