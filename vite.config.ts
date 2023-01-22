// import { defineConfig, type UserConfig, searchForWorkspaceRoot } from 'vite';
// import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
// import eslintPlugin from '@modyqyw/vite-plugin-eslint';
// import Components from 'unplugin-vue-components/vite';
// import { visualizer } from 'rollup-plugin-visualizer';
// import stylelintPlugin from 'vite-plugin-stylelint';
// import { createVuePlugin } from 'vite-plugin-vue2';
// import path from 'path';
// import fs from 'fs';

// // https://vitejs.dev/config/
// export default defineConfig(async ({ mode }): Promise<UserConfig> => {
//   const config: UserConfig = {
//     // https://vitejs.dev/config/#base
//     base: './',
//     // Resolver
//     resolve: {
//       // https://vitejs.dev/config/#resolve-alias
//       alias: [
//         {
//           // vue @ shortcut fix
//           find: '@/',
//           replacement: `${path.resolve(__dirname, './src')}/`
//         },
//         {
//           find: 'src/',
//           replacement: `${path.resolve(__dirname, './src')}/`
//         }
//       ]
//     },

//     // https://vitejs.dev/config/#server-options
//     server: {
//       host: 'localhost',
//       port: 3001,
//       fs: {
//         // Allow serving files from one level up to the project root
//         allow: ['..']
//       }
//     },
//     plugins: [
//       // Vue2
//       // https://github.com/underfin/vite-plugin-vue2
//       createVuePlugin({
//         target: 'esnext'
//       }),
//       // unplugin-vue-components
//       // https://github.com/antfu/unplugin-vue-components
//       Components({
//         // generate `components.d.ts` global declarations
//         dts: true,
//         // auto import for directives
//         directives: true,
//         // resolvers for custom components
//         resolvers: [
//           // Vuetify
//           VuetifyResolver()
//         ]
//       })
//       // eslint
//       // https://github.com/ModyQyW/vite-plugin-eslint
//       // eslintPlugin(),
//       // Stylelint
//       // https://github.com/ModyQyW/vite-plugin-stylelint
//       // stylelintPlugin()
//       // compress assets
//       // https://github.com/vbenjs/vite-plugin-compression
//       // viteCompression(),
//     ],
//     css: {
//       postcss: {
//         plugins: [
//           // Fix vite build includes @charset problem
//           // https://github.com/vitejs/vite/issues/5655
//           {
//             postcssPlugin: 'internal:charset-removal',
//             AtRule: {
//               charset: atRule => {
//                 if (atRule.name === 'charset') {
//                   atRule.remove();
//                 }
//               }
//             }
//           }
//         ]
//       },
//       // https://vitejs.dev/config/#css-preprocessoroptions
//       preprocessorOptions: {
//         sass: {
//           additionalData: [
//             // vuetify variable overrides
//             '@import "@/styles/variables.scss"',
//             ''
//           ].join('\n')
//         }
//       }
//     },
//     // Build Options
//     // https://vitejs.dev/config/#build-options
//     build: {
//       rollupOptions: {
//         output: {
//           manualChunks: {
//             // Split external library from transpiled code.
//             vue: [
//               'vue',
//               '@vue/composition-api',
//               'vue-class-component',
//               'vue-property-decorator',
//               'vue-router',
//               'vuex',
//               'vuex-persist',
//               'vue2-helpers'
//             ],
//             vuetify: ['vuetify/lib'],
//             echarts: ['echarts/features', 'echarts/renderers'],
//             'echarts-core': [
//               'echarts/core',
//               'echarts',
//               'echarts/components',
//               'echarts/charts'
//             ]
//           },
//           plugins: [
//             mode === 'analyze'
//               ? // rollup-plugin-visualizer
//                 // https://github.com/btd/rollup-plugin-visualizer
//                 visualizer({
//                   open: true,
//                   filename: 'dist/stats.html',
//                   gzipSize: true,
//                   brotliSize: true
//                 })
//               : undefined
//             /*
//             // if you use Code encryption by rollup-plugin-obfuscator
//             // https://github.com/getkey/rollup-plugin-obfuscator
//             obfuscator({
//               globalOptions: {
//                 debugProtection: true,
//               },
//             }),
//             */
//           ]
//         }
//       },
//       target: 'es2021'
//       /*
//       // Minify option
//       // https://vitejs.dev/config/#build-minify
//       minify: 'terser',
//       terserOptions: {
//         ecma: 2020,
//         parse: {},
//         compress: { drop_console: true },
//         mangle: true, // Note `mangle.properties` is `false` by default.
//         module: true,
//         output: { comments: true, beautify: false },
//       },
//       */
//     }
//   };
//   // Hook production build.
//   // if (command === 'build') {
//   // Write meta data.
//   fs.writeFileSync(
//     path.resolve(path.join(__dirname, 'src/Meta.ts')),
//     `import type MetaInterface from '@/interfaces/MetaInterface';

// // This file is auto-generated by the build system.
// const meta: MetaInterface = {
//   version: '${require('./package.json').version}',
//   date: '${new Date().toISOString()}',
// };
// export default meta;
// `
//   );
//   // }

//   return config;
// });

console.log('!!!!!', process.cwd());

import { defineConfig, searchForWorkspaceRoot } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// import { workspacesAlias, htmlFallback, gqlPlugin } from './packages/vite';

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';

import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';
import Unocss from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // external: ['vue'],
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          tinymce: 'tinymce'
        }
      }
    }
  },
  resolve: {
    // https://vitejs.dev/config/#resolve-alias
    alias: [
      { find: '~', replacement: path.resolve(__dirname) },
      {
        // vue @ shortcut fix
        find: '@/',
        replacement: `${path.resolve(__dirname, './src')}/`
      },
      {
        find: 'src/',
        replacement: `${path.resolve(__dirname, './src')}/`
      }
    ]
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`
      }
    }
  },
  server: {
    host: 'localhost',
    port: 4001,
    https: false,
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())]
    }
  },
  plugins: [
    vue({
      reactivityTransform: true
    }),

    // workspacesAlias(['.'], ['vite']),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: './components.d.ts',
      dirs: ['apps', 'libs']
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true
        })
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()]
    }),

    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ],

      dts: path.resolve('./auto-imports.d.ts')
    }),

    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep', 'mdi', 'line-md']
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],

      dts: path.resolve('./components.d.ts')
    }),

    Icons({
      autoInstall: true
    })
  ]
});
