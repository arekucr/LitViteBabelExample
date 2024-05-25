import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'url';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import timeReporter from 'vite-plugin-time-reporter';
import progress from 'vite-plugin-progress';
import babel from 'vite-plugin-babel';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'; // if we are in dev or production mode generating the site.  

  return {
  plugins: [
    babel({
      // transpile for the latest 2 browsers version (browserlistrc), this is needed bc the decorators support in code
      babelConfig: {
        babelrc: false,
        sourceMaps: true,
        configFile: false,
        plugins: [
          ["@babel/plugin-proposal-decorators", {version: "2018-09", decoratorsBeforeExport : true}],
          ["@babel/plugin-proposal-class-properties"],
          '@babel/plugin-transform-class-static-block',
        ],
      },
    }),
    // automatic service worker generation with vite-pwa (workbox)
    VitePWA({ registerType: 'autoUpdate', 
              devOptions: {
                enabled: true
              },
              workbox: 
              {
                cacheId: 'bdx-live-redesign',
                skipWaiting: true,
                clientsClaim: true, 
                cleanupOutdatedCaches: true,
                runtimeCaching: [
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            /**
                             * Use a custom cache name for this route.
                             */
                            cacheName: 'image-cache',
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                            fetchOptions: {
                                mode: 'no-cors',
                            },
                        },
                    },
                ],
            }
    }), 
    ViteEjsPlugin({
      // Add ejs support in the index html to inject html or add variables
      settingsUrl: `/settings/app.settings${isProd ? '' : `.${mode}`}.js`, // we conditionally inject the app.settings url so it works for prod and dev.
    }),
    progress(), // display a progress bar for the entire build process
    timeReporter(), // build times at the end in a table format
    visualizer({
      // generates a html file with the bundle information and packaged distribution in the final build folder
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'bundle-analizer.html', // will be saved in project's root
    }),
  ],
  resolve: {
    // aliases support for the files so we can reference relative paths with specific variables
    alias: [
      {
        find: '@/assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
      {
        find: '@/components',
        replacement: fileURLToPath(new URL('./src/components', import.meta.url)),
      },
    ],
  },
  build: {
    minify: false,
    target: browserslistToEsbuild(),
    sourcemap: true, // generate source maps for the bundles
    outDir: 'build', // director where the build output will be generated
    rollupOptions: {
      // output: {
      //   // source maps base url pointing to our build env (so it is restricted for external users)
      //   sourcemapBaseUrl: `http://build-redesign.thebdxlive.com/BHIContent/sourcemaps/`,
      // },
    },
  },
  server: {
    host: 'dev.thebdxlive.com',
    port: 1997,
    https: {
      pfx: fs.readFileSync('./bdxcert.pfx'),
      passphrase: 'newhomesource',
    },
  },

};
});
