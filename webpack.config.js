const autoprefixer = require('autoprefixer');

module.exports = [{
    entry: ['./style.scss', './assets/js/main.js'],
    output: {
      // This is necessary for webpack to compile
      // But we never use style-bundle.js
      filename: 'bundle.js',
    },
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