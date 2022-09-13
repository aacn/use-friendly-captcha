import {
  main as mainPath,
  module as modulePath,
  peerDependencies,
} from './package.json';

import { swc } from 'rollup-plugin-swc3';
import del from 'rollup-plugin-delete';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import prettier from 'rollup-plugin-prettier';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescriptPaths from "rollup-plugin-typescript-paths";
import path from "path"
import autoprefixer from 'autoprefixer';

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
    external: [...Object.keys(peerDependencies || {}), 'components/styles/global.css'],
    plugins: [
      del({ targets: ['dist/*', 'playground/src/component-lib/*'] }),
      nodeResolve({
        extensions: [".css"],
      }),
      postcss({
        plugins: [autoprefixer],
        config: {
          path: "./postcss.config.js",
        },
        include: "src/components/styles/global.css",
        modules: true,
        extensions: [".css"],
        extract: path.resolve('playground/src/component-lib/styles/global.css'),
        sourceMap: true,
        minimize: true,
        autoModules: false,
        inject: {
          insertAt: "top",
        },
      }),
      typescriptPaths({
        preserveExtensions: true,
      }),
      json(),
      // Transpile with swc
      swc({
        jsc: {
          baseUrl: "./src",
          paths: { "@/*": ["*"] },
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
  },
];
