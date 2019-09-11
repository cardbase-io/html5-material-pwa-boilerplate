const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = [{
    entry: ['./style.scss', './main.js'],
    output: {
      filename: 'bundle.js',
    },
    plugins: [
      // new HtmlWebpackPlugin({
      //   template: './index.html',
      //   domain: process.env.PROJECT_DOMAIN,
      //   inject: false
      // }),
      new FileManagerPlugin({ //fixing a bug : if filename is changing, it is not overriding )
        onStart: {
          delete: [
            './dist/precache-manifest.*.js',
           ]
        }
      }),
      new CopyPlugin([   //some files has to be under public
        { from: '*.html', to: '' },
        { from: '*.xml', to: '' },
        { from: '*.svg', to: '' },
        { from: 'assets/**', to: '' },
        { from: 'service-worker.js', to: '' },
        { from: 'site.webmanifest', to: '' },
        { from: 'favicon.ico', to: '' },
        { from: '*.png', to: '' },
        { from: 'robots.txt', to: '' },
      ]),
      new WorkboxPlugin.GenerateSW({  //in prod. mode, not use workbox-config.js
        // "globDirectory": ".",
        // "globPatterns": [
        //   "**/*.{html,png,jpeg,jpg,css,js,xml,ico,webmanifest,json,scss,md}"
        // ],

        "swDest": "service-worker.js",
        cleanupOutdatedCaches: true,

        // Define runtime caching rules.
        runtimeCaching: [{
          urlPattern: /\.(?:png|ico|jpg|jpeg|svg)$/,

          handler: 'CacheFirst',

          options: {
            cacheName: 'images-www',

            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 10 * 24 * 60 * 60 //10 days
            },
          },
        }],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            { loader: 'file-loader', options: {name: 'bundle.css', },},
            { loader: 'extract-loader' },
            { loader: 'css-loader' },
            { loader: 'postcss-loader', options: { plugins: () => [autoprefixer()] } },
            { loader: 'sass-loader', options: { includePaths: ['./node_modules'] } }
          ]
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
             presets: ['@babel/preset-env'],
          },
        }
      ]
    },
  }];