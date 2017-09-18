var path = require('path');
var webpack = require('webpack');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  devtool: 'source-map',

  //entry: path.resolve(APP_DIR, 'components/index.jsx'),
  entry: [
    'webpack-hot-middleware/client',
    APP_DIR + '/components/index.jsx'
  //  path.resolve(__dirname, '/src/client/public/index.html')
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },

  devServer: {
    contentBase: './src/client/public'
  },

  plugins: [
    // OccurenceOrderPlugin is needed for webpack 1.x only
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin(['GOOGLE_MAPS_KEY'])
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        exclude: /node_modules/,
        query: {
            presets: ['react', 'es2015']
        },
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: BUILD_DIR,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};

module.exports = config;