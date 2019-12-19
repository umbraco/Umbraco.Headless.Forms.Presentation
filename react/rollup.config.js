import strip from '@rollup/plugin-strip'

import copy from 'rollup-plugin-cpy'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  external: ['react', 'react-dom'],
  output: {
    file: pkg.main,
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    copy({
      files: 'src/themes/*.css',
      dest: 'dist/themes',
    }),
    typescript({
      clean: true
    }),
    strip(),
    peerDepsExternal({
      includeDependencies: false,
    }),
    terser(),
  ],
}
