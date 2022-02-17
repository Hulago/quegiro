import { createVuePlugin } from 'vite-plugin-vue2';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import { workspacesAlias, htmlFallback, gqlPlugin } from './packages/vite';
import svgLoader from 'vite-svg-loader';

import { resolve } from 'path';
import { readFileSync } from 'fs';

const BUILD_MODE = process.env.BUILD_MODE || 'dev';
const envMessage = `ENVIRONMENT: ${BUILD_MODE}`;

// eslint-disable-next-line no-console
console.log('\x1b[33m%s\x1b[0m', envMessage);

var file = readFileSync(resolve(__dirname, 'apps/dashboard/index.html'));

export default defineConfig({
  build: {
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // external: ['vue'],
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'apps/dashboard/index.html'),
        organization: resolve(__dirname, 'apps/organization/index.html')
      },
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [
    createVuePlugin({}),
    workspacesAlias(['.'], ['vite']),
    svgLoader(),
    gqlPlugin(),
    require('rollup-plugin-web-worker-loader')({
      pattern: /(.+)\?worker/,
      preserveSource: true, // somehow results in slightly smaller bundle
      targetPlatform: 'browser'
    }),
    htmlFallback()
    // workspaceRollupOptions() // Mandatory to be the last plugin
  ],
  optimizeDeps: {
    exclude: ['vue-svgicon'],
    include: [
      // 'vue-color/dist/vue-color.min.js',
      // 'tinycolor2/tinycolor.js',
      // 'vuedraggable/dist/vuedraggable.umd.js',
      // 'tinymce/tinymce.js',
      // 'tinymce/plugins/advlist',
      // 'tinymce/plugins/charmap',
      // 'tinymce/plugins/directionality',
      // 'tinymce/plugins/fullscreen',
      // 'tinymce/plugins/hr',
      // 'tinymce/plugins/link',
      // 'tinymce/plugins/lists',
      // 'tinymce/plugins/pagebreak',
      // 'tinymce/plugins/paste',
      // 'tinymce/plugins/tabfocus',
      // 'tinymce/plugins/table',
      // 'tinymce/plugins/textpattern',
      // 'tinymce/plugins/visualblocks',
      // 'tinymce/plugins/visualchars',
      // 'tinymce/plugins/wordcount',
      // 'tinymce/themes/silver/theme',
      // 'tinymce/icons/default/icons',
      'vuetify/dist/vuetify.min.js'
      // 'moment-timezone/index.js',
      // 'moment/moment.js'
    ]
  },
  server: {
    host: 'localhost',
    https: false,
    open: process.platform === 'darwin',
    port: 9092,
    proxy: {
      '^/api/private': {
        changeOrigin: true,
        headers: {
          'Content-type': 'application/json'
        },
        rewrite: (path: string) => {
          const url = path.replace('/api/private', '');
          return `/apiman-gateway/partnership/private-intranet/1.1${url}`;
        },
        target: 'https://api.dev.prozis.tech',
        ws: true
      },
      '^/api/public': {
        changeOrigin: true,
        headers: {
          'Content-type': 'application/json'
        },
        rewrite: (path: string) => {
          const base = `/apiman-gateway/partnership/${
            BUILD_MODE === 'prd' ? 'prd-public' : 'public'
          }/1.0`;
          const url = path.replace('/api/public', '');

          return `${base}${url}`;
        },
        target:
          BUILD_MODE === 'prd'
            ? 'https://api.prozis.tech'
            : 'https://api-dev.prozis.tech',
        ws: true
      },
      '^/test': {
        changeOrigin: true,
        headers: {
          'Content-type': 'application/json'
        },
        rewrite: () => '/',
        target: 'http://localhost:3000'
      }
    },
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())]
    }
  }
});
