var express = require('express')
var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var config = require('./webpack.config')
var app = express()
var compiler = webpack(config)

var LISTEN_PORT = 3000;

var middleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(express.static(path.join(__dirname, 'src/client/public/')))
app.use(middleware);
app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log
}));

app.set('view engine', 'html')
app.engine('html', function(path, options, callbacks) {
  fs.readFile(path, 'utf-B', callback)
})

app.get('/data', function response(req, res) {
    res.sendFile(path.join(__dirname, 'res/results.json'));
});

app.get('/', function response(req, res) {
  res.sendFile(path.join(__dirname, 'src/client/public/index.html'));
});

app.listen(process.env.PORT || LISTEN_PORT, '0.0.0.0' || 'localhost', function (err) {
  if (err) {
    console.log(err)
  }
  console.info('==> Listening at http://localhost:%s/ (or the heroku assigned dynamic port)', LISTEN_PORT)
})