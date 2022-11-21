import {
  main as mainPath,
  module as modulePath,
  peerDependencies,
} from './package.json';

import { swc } from 'rollup-plugin-swc3';
import del from 'rollup-plugin-delete';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import flatDts from 'rollup-plugin-flat-dts';
import prettier from 'rollup-plugin-prettier';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescriptPaths from "rollup-plugin-typescript-paths";

const config = [
  {
    input: 'src/index.ts',
    external: Object.keys(peerDependencies || {}),
    plugins: [
        del({ targets: ['dist/*', 'playground/src/component-lib/*'] }),
        nodeResolve(),
        typescriptPaths({
          preserveExtensions: true,
        }),
        json(),
        commonjs(),
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
      output: [
          // Outputs the packaged lib in the preview workspace 'playground'
          {
              file: 'playground/src/component-lib/index.js',
              format: 'esm',
              banner: '/* eslint-disable */',
              plugins: [flatDts()]
          },
          // Outputs the packaged lib in CommonJS format
          { file: mainPath, format: 'cjs', plugins: [flatDts()] },
          // Outputs the packaged lib in ES Module format
          { file: modulePath, format: 'esm', plugins: [flatDts()] },
      ]
  },
];

export default config;
